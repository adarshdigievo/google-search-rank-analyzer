"""
Search Ranking Analyser - Backend Server

FastAPI application that searches Google via SerpAPI across 5 countries,
finds the position of a target domain in organic results, and caches
results to JSON files.
"""

import hashlib
import json
import os
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path

import serpapi
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
CACHE_DIR = BASE_DIR / "cache"
STATIC_DIR = BASE_DIR / "static"

COUNTRIES = {
    "us": {
        "name": "United States",
        "gl": "us",
        "google_domain": "google.com",
        "flag": "\U0001f1fa\U0001f1f8",
    },
    "gb": {
        "name": "United Kingdom",
        "gl": "gb",
        "google_domain": "google.co.uk",
        "flag": "\U0001f1ec\U0001f1e7",
    },
    "in": {
        "name": "India",
        "gl": "in",
        "google_domain": "google.co.in",
        "flag": "\U0001f1ee\U0001f1f3",
    },
    "au": {
        "name": "Australia",
        "gl": "au",
        "google_domain": "google.com.au",
        "flag": "\U0001f1e6\U0001f1fa",
    },
    "ca": {
        "name": "Canada",
        "gl": "ca",
        "google_domain": "google.ca",
        "flag": "\U0001f1e8\U0001f1e6",
    },
}

SERP_FEATURES = {
    "ads": "Ads",
    "shopping_results": "Shopping",
    "answer_box": "Featured Snippet",
    "knowledge_graph": "Knowledge Graph",
    "related_questions": "PAA",
    "local_results": "Local Pack",
}

SCHEMA_VERSION = 2


# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
    """Startup/shutdown lifecycle handler."""
    if not os.environ.get("SERPAPI_KEY"):
        print(
            "WARNING: SERPAPI_KEY environment variable is not set. "
            "API searches will fail until it is configured."
        )
    yield


app = FastAPI(title="Search Ranking Analyser", lifespan=lifespan)

# Ensure the cache directory exists
CACHE_DIR.mkdir(exist_ok=True)


# ---------------------------------------------------------------------------
# Request / helpers
# ---------------------------------------------------------------------------


class SearchRequest(BaseModel):
    query: str
    domain: str


def _get_serpapi_client() -> serpapi.Client:
    """Return a SerpAPI client, validating that the key is present."""
    api_key = os.environ.get("SERPAPI_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="SERPAPI_KEY environment variable is not set.",
        )
    return serpapi.Client(api_key=api_key)


def _parse_domains(raw_domain: str) -> list[str]:
    """Parse comma-separated domain string into cleaned list."""
    domains = [d.strip().lower() for d in raw_domain.split(",")]
    domains = [d for d in domains if d]
    if not domains:
        raise HTTPException(status_code=400, detail="At least one domain is required.")
    if len(domains) > 4:
        raise HTTPException(status_code=400, detail="Maximum 4 domains allowed.")
    return domains


def _cache_key(query: str, domains: list[str]) -> str:
    """Compute MD5 cache key for query + sorted domains."""
    raw = query.lower() + "|" + "|".join(sorted(domains))
    return hashlib.md5(raw.encode()).hexdigest()


def _read_cache(key: str) -> dict | None:
    """Return cached result dict, or None if not cached or wrong schema."""
    cache_file = CACHE_DIR / f"{key}.json"
    if cache_file.exists():
        with open(cache_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        if data.get("schema_version") == SCHEMA_VERSION:
            return data
    return None


def _write_cache(key: str, data: dict) -> None:
    """Write result dict to the cache directory."""
    cache_file = CACHE_DIR / f"{key}.json"
    with open(cache_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def _find_domains_in_results(
    organic_results: list[dict], domains: list[str]
) -> dict[str, dict]:
    """Find positions of ALL target domains in organic results."""
    results = {}
    for domain in domains:
        domain_lower = domain.lower()
        found = False
        for i, result in enumerate(organic_results, start=1):
            link = result.get("link", "")
            if domain_lower in link.lower():
                results[domain] = {
                    "position": i,
                    "title": result.get("title"),
                    "url": link,
                    "snippet": result.get("snippet"),
                }
                found = True
                break
        if not found:
            results[domain] = {
                "position": None,
                "title": None,
                "url": None,
                "snippet": None,
            }
    return results


def _domain_in_feature(feature_data, domain_lower: str) -> bool:
    """Check if domain appears in a SERP feature's data."""
    if isinstance(feature_data, list):
        for item in feature_data:
            if isinstance(item, dict):
                for field in ("link", "domain", "displayed_link", "source"):
                    val = item.get(field)
                    if isinstance(val, str) and domain_lower in val.lower():
                        return True
    elif isinstance(feature_data, dict):
        for field in ("link", "domain", "displayed_link", "source", "website"):
            val = feature_data.get(field)
            if isinstance(val, str) and domain_lower in val.lower():
                return True
        nested = feature_data.get("organic_result")
        if isinstance(nested, dict):
            link = nested.get("link", "")
            if isinstance(link, str) and domain_lower in link.lower():
                return True
    return False


def _detect_serp_features(
    raw_results: dict, domains: list[str]
) -> tuple[list[str], dict[str, list[str]]]:
    """Detect SERP features and which domains appear in them."""
    serp_features_present = []
    domain_features: dict[str, list[str]] = {d: [] for d in domains}

    for feature_key in SERP_FEATURES:
        feature_data = raw_results.get(feature_key)
        if feature_data is None:
            continue
        serp_features_present.append(feature_key)
        for domain in domains:
            if _domain_in_feature(feature_data, domain.lower()):
                domain_features[domain].append(feature_key)

    return serp_features_present, domain_features


def _search_country(
    client: serpapi.Client,
    query: str,
    domains: list[str],
    country_cfg: dict,
) -> dict:
    """Run SerpAPI search for one country, find all domains, detect SERP features."""
    raw_results = client.search({
        "engine": "google",
        "q": query,
        "gl": country_cfg["gl"],
        "google_domain": country_cfg["google_domain"],
        "num": 100,
    })
    organic = raw_results.get("organic_results", [])
    domain_rankings = _find_domains_in_results(organic, domains)

    serp_features_present, domain_features = _detect_serp_features(raw_results, domains)
    for domain in domains:
        domain_rankings[domain]["serp_features"] = domain_features.get(domain, [])

    return {
        "name": country_cfg["name"],
        "gl": country_cfg["gl"],
        "google_domain": country_cfg["google_domain"],
        "flag": country_cfg["flag"],
        "total_results": len(organic),
        "domains": domain_rankings,
        "serp_features_present": serp_features_present,
    }


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@app.get("/")
async def serve_index():
    """Serve the frontend single-page app."""
    index_path = STATIC_DIR / "index.html"
    if not index_path.exists():
        raise HTTPException(status_code=404, detail="index.html not found")
    return FileResponse(str(index_path))


@app.post("/api/search")
async def search(req: SearchRequest):
    """Search Google across 5 countries for multiple domains."""
    query = req.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="'query' is required.")

    domains = _parse_domains(req.domain)

    key = _cache_key(query, domains)
    cached = _read_cache(key)
    if cached is not None:
        cached["cached"] = True
        return cached

    client = _get_serpapi_client()
    countries_results: dict[str, dict] = {}
    for code, cfg in COUNTRIES.items():
        countries_results[code] = _search_country(client, query, domains, cfg)

    response = {
        "schema_version": SCHEMA_VERSION,
        "query": query,
        "domains": domains,
        "timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "cached": False,
        "countries": countries_results,
    }

    _write_cache(key, response)
    return response


@app.get("/api/suggestions")
async def suggestions(q: str = ""):
    """Return Google autocomplete suggestions for a partial query."""
    q = q.strip()
    if not q or len(q) < 2:
        return {"suggestions": []}

    key = hashlib.md5(("autocomplete|" + q.lower()).encode()).hexdigest()
    cached = _read_cache(key)
    if cached is not None:
        return cached

    client = _get_serpapi_client()
    results = client.search({"engine": "google_autocomplete", "q": q})

    suggestion_list = []
    for item in results.get("suggestions", []):
        val = item.get("value")
        if val:
            suggestion_list.append(val)

    response = {"schema_version": SCHEMA_VERSION, "suggestions": suggestion_list}
    _write_cache(key, response)
    return response


# Mount static files (CSS/JS) at /static — MUST be after all route definitions
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

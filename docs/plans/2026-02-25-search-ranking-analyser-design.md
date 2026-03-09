# Search Ranking Analyser - Design

## Overview
A web app that lets users enter a search term and domain, then queries Google via SerpAPI across 5 countries (US, UK, India, Australia, Canada) to find where that domain ranks in each country's results. Results are cached locally to preserve API credits.

## Tech Stack
- **Backend**: Python, FastAPI, SerpAPI SDK (`google-search-results`)
- **Frontend**: HTML, CSS, vanilla JS (no frameworks/libraries)
- **Cache**: JSON files on disk in `cache/` directory

## Architecture

### Backend (`server.py`)
Single FastAPI application:
- `GET /` - serves the frontend HTML
- `POST /api/search` - accepts `{query: str, domain: str}`, returns ranking data
- Static file mounting for CSS/JS assets

### Search Flow
1. Receive query + domain from frontend
2. Generate cache key from `hash(query + domain)`
3. Check `cache/` directory for existing results
4. If cached, return immediately
5. If not cached, call SerpAPI for each of 5 countries (google_domain + gl params)
6. Parse organic results, find domain position (match domain substring in result URLs)
7. Cache results as JSON file
8. Return structured response

### API Response Shape
```json
{
  "query": "best coffee beans",
  "domain": "example.com",
  "timestamp": "2026-02-25T10:30:00Z",
  "cached": false,
  "results": {
    "us": {"position": 3, "title": "...", "url": "...", "total_results": 10},
    "gb": {"position": null, "title": null, "url": null, "total_results": 10},
    "in": {"position": 7, "title": "...", "url": "...", "total_results": 10},
    "au": {"position": 1, "title": "...", "url": "...", "total_results": 10},
    "ca": {"position": 5, "title": "...", "url": "...", "total_results": 10}
  }
}
```

### SerpAPI Country Config
| Country   | `gl` param | `google_domain`    |
|-----------|------------|--------------------|
| US        | us         | google.com         |
| UK        | gb         | google.co.uk       |
| India     | in         | google.co.in       |
| Australia | au         | google.com.au      |
| Canada    | ca         | google.ca          |

### Caching
- Directory: `cache/`
- Filename: MD5 hash of `query_lower + domain_lower` + `.json`
- Contains full API response + metadata (timestamp, query, domain)
- No expiration (preserves credits as requested)

## Frontend

### Layout
- Clean dark theme
- Top: search form (query input + domain input + search button)
- Middle: ranking overview cards (one per country, showing position with color coding)
- Bottom: horizontal bar chart comparing rankings visually

### Ranking Cards
Each country card shows:
- Country flag emoji + name
- Position number (large, prominent)
- Color coding: green (#1-3), yellow (#4-7), orange (#8-10), red (>10 or not found)
- The matched URL title if found

### Bar Chart
- Pure CSS/JS horizontal bars
- Each bar represents a country's rank
- Shorter bar = better rank (inverted scale - position 1 is the shortest bar)
- Color matches the ranking card colors
- Animated on load

### States
- Empty: landing page with search form
- Loading: skeleton/spinner animation
- Results: cards + chart
- Error: clear error message

## API Key
- Read from `SERPAPI_KEY` environment variable
- Server refuses to start if not set

## File Structure
```
search_ranking_analyser/
  server.py          # FastAPI backend
  static/
    index.html       # Frontend page
    style.css        # Styles
    app.js           # Frontend logic
  cache/             # Cached search results
  docs/plans/        # Design docs
```

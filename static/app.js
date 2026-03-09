(function () {
  'use strict';

  // --- DOM References ---
  var queryInput = document.querySelector('#query');
  var domainInput = document.querySelector('#domain');
  var searchBtn = document.querySelector('#search-btn');
  var searchForm = document.querySelector('#search-form');
  var resultsSection = document.querySelector('.results-section');
  var summaryBar = document.querySelector('.summary-bar');
  var rankingsGrid = document.querySelector('.rankings-grid');
  var chartContainer = document.querySelector('.chart-container');
  var chartLegend = document.querySelector('.chart-legend');
  var loadingOverlay = document.querySelector('.loading-overlay');
  var errorToast = document.querySelector('.error-toast');
  var errorMessage = document.querySelector('.error-message');
  var errorClose = document.querySelector('.error-close');
  var historyList = document.querySelector('.history-list');
  var historySection = document.querySelector('.history-section');
  var suggestionsDropdown = document.querySelector('#suggestions-dropdown');

  var HISTORY_KEY = 'search_history';
  var MAX_HISTORY = 10;
  var errorTimeout = null;
  var activeSuggestionIndex = -1;

  var DOMAIN_COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];

  var SERP_FEATURE_LABELS = {
    'ads': 'Ads',
    'shopping_results': 'Shopping',
    'answer_box': 'Featured Snippet',
    'knowledge_graph': 'Knowledge Graph',
    'related_questions': 'PAA',
    'local_results': 'Local Pack'
  };

  // --- Utilities ---

  function formatTimestamp(isoString) {
    var date = new Date(isoString);
    return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  }

  function truncateUrl(url, maxLen) {
    maxLen = maxLen || 50;
    if (!url) return '';
    if (url.length <= maxLen) return url;
    return url.substring(0, maxLen) + '\u2026';
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function getRankClass(position) {
    if (position === null || position === undefined) return 'rank-none';
    if (position >= 1 && position <= 3) return 'rank-excellent';
    if (position >= 4 && position <= 7) return 'rank-good';
    if (position >= 8 && position <= 10) return 'rank-fair';
    return 'rank-poor';
  }

  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }

  // --- Loading ---

  function setLoading(isLoading) {
    if (isLoading) {
      loadingOverlay.classList.remove('hidden');
      searchBtn.disabled = true;
      queryInput.disabled = true;
      domainInput.disabled = true;
    } else {
      loadingOverlay.classList.add('hidden');
      searchBtn.disabled = false;
      queryInput.disabled = false;
      domainInput.disabled = false;
    }
  }

  // --- Error Handling ---

  function showError(message) {
    errorMessage.textContent = message;
    errorToast.classList.add('visible');
    errorToast.classList.remove('hidden');
    if (errorTimeout) clearTimeout(errorTimeout);
    errorTimeout = setTimeout(function () { dismissError(); }, 5000);
  }

  function dismissError() {
    errorToast.classList.remove('visible');
    if (errorTimeout) { clearTimeout(errorTimeout); errorTimeout = null; }
  }

  errorClose.addEventListener('click', function () { dismissError(); });

  // --- Rendering ---

  function renderSummary(data) {
    var domainsText = data.domains.join(', ');
    var cachedPill = data.cached
      ? '<span class="badge badge-cached">Cached</span>'
      : '<span class="badge badge-live">Live</span>';

    summaryBar.innerHTML =
      '<span class="summary-query">\u201C' + escapeHtml(data.query) + '\u201D</span>' +
      '<span class="summary-domain">' + escapeHtml(domainsText) + '</span>' +
      '<span class="summary-timestamp">' + escapeHtml(formatTimestamp(data.timestamp)) + '</span>' +
      '<span class="summary-badge">' + cachedPill + '</span>';
  }

  function renderSerpBadges(serpFeatures, isDomain) {
    if (!serpFeatures || serpFeatures.length === 0) return '';
    var html = '<div class="serp-badges">';
    serpFeatures.forEach(function (feat) {
      var cls = isDomain ? 'serp-badge serp-badge-domain' : 'serp-badge';
      html += '<span class="' + cls + '">' + escapeHtml(SERP_FEATURE_LABELS[feat] || feat) + '</span>';
    });
    html += '</div>';
    return html;
  }

  function renderCards(data) {
    rankingsGrid.innerHTML = '';
    var domains = data.domains;
    var isSingle = domains.length === 1;
    var codes = Object.keys(data.countries);

    codes.forEach(function (code) {
      var country = data.countries[code];
      var cardHtml = '<div class="ranking-card">';

      // Header
      cardHtml += '<div class="card-header">' +
        '<span class="card-flag">' + (country.flag || '') + '</span>' +
        '<span class="card-country">' + escapeHtml(country.name) + '</span>' +
        '</div>';

      if (isSingle) {
        var domainData = country.domains[domains[0]];
        var position = domainData.position;
        var rankClass = getRankClass(position);
        var posText = position !== null && position !== undefined ? position : 'N/A';
        var labelText = position !== null && position !== undefined ? 'Position' : 'Not Found';

        cardHtml += '<div class="card-position ' + rankClass + '">' + posText + '</div>';
        cardHtml += '<div class="card-label">' + labelText + '</div>';

        if (domainData.url) {
          cardHtml += '<div class="card-url" title="' + escapeHtml(domainData.url) + '">' +
            escapeHtml(truncateUrl(domainData.url)) + '</div>';
        }
        if (domainData.snippet) {
          cardHtml += '<div class="card-snippet">' + escapeHtml(domainData.snippet) + '</div>';
        }

        // Domain SERP badges (green - domain appears in these)
        cardHtml += renderSerpBadges(domainData.serp_features, true);

        // Page-level SERP features the domain is NOT in (indigo)
        var pageOnly = (country.serp_features_present || []).filter(function (f) {
          return (domainData.serp_features || []).indexOf(f) === -1;
        });
        cardHtml += renderSerpBadges(pageOnly, false);

      } else {
        // Multi-domain compact list
        cardHtml += '<div class="card-domains">';
        domains.forEach(function (domain, idx) {
          var domainData = country.domains[domain];
          var position = domainData.position;
          var rankClass = getRankClass(position);
          var posText = position !== null && position !== undefined ? '#' + position : 'N/A';
          var colorClass = 'domain-color-' + idx;

          cardHtml += '<div class="domain-entry">' +
            '<span class="domain-name ' + colorClass + '">' + escapeHtml(domain) + '</span>' +
            '<span class="domain-position ' + rankClass + '">' + posText + '</span>' +
            '</div>';

          // Per-domain SERP badges
          cardHtml += renderSerpBadges(domainData.serp_features, true);
        });
        cardHtml += '</div>';

        // Page-level SERP features
        var allDomainFeats = [];
        domains.forEach(function (d) {
          (country.domains[d].serp_features || []).forEach(function (f) {
            if (allDomainFeats.indexOf(f) === -1) allDomainFeats.push(f);
          });
        });
        var pageOnly = (country.serp_features_present || []).filter(function (f) {
          return allDomainFeats.indexOf(f) === -1;
        });
        cardHtml += renderSerpBadges(pageOnly, false);
      }

      cardHtml += '</div>';
      rankingsGrid.insertAdjacentHTML('beforeend', cardHtml);
    });
  }

  function renderChart(data) {
    chartContainer.innerHTML = '';
    var domains = data.domains;
    var isSingle = domains.length === 1;
    var codes = Object.keys(data.countries);

    // Render legend
    if (chartLegend) {
      chartLegend.innerHTML = '';
      if (!isSingle) {
        domains.forEach(function (domain, idx) {
          chartLegend.innerHTML += '<div class="legend-item">' +
            '<div class="legend-swatch" style="background-color: ' + DOMAIN_COLORS[idx] + '"></div>' +
            '<span>' + escapeHtml(domain) + '</span>' +
            '</div>';
        });
      }
    }

    var barIndex = 0;

    codes.forEach(function (code) {
      var country = data.countries[code];
      var labelHtml = '<div class="chart-label"><span>' + (country.flag || '') + '</span> <span>' + escapeHtml(country.name) + '</span></div>';

      if (isSingle) {
        var domainData = country.domains[domains[0]];
        var position = domainData.position;
        var rankClass = getRankClass(position);
        var barWidth = (position === null || position === undefined) ? 5 : Math.max(5, 101 - position);
        var barText = (position === null || position === undefined) ? 'Not Found' : '#' + position;

        var rowHtml = '<div class="chart-row">' + labelHtml +
          '<div class="chart-bar-wrapper">' +
            '<div class="chart-bar ' + rankClass + '" style="width: 0%;" data-width="' + barWidth + '">' +
              '<span class="chart-bar-text">' + escapeHtml(barText) + '</span>' +
            '</div>' +
          '</div></div>';
        chartContainer.insertAdjacentHTML('beforeend', rowHtml);

        (function (bi, bw) {
          setTimeout(function () {
            var bars = chartContainer.querySelectorAll('.chart-bar');
            if (bars[bi]) bars[bi].style.width = bw + '%';
          }, 100 * bi);
        })(barIndex, barWidth);
        barIndex++;

      } else {
        // Grouped bars
        var groupHtml = '<div class="chart-row-group">' + labelHtml + '<div class="chart-bars-group">';

        domains.forEach(function (domain, idx) {
          var domainData = country.domains[domain];
          var position = domainData.position;
          var barWidth = (position === null || position === undefined) ? 5 : Math.max(5, 101 - position);
          var barText = (position === null || position === undefined) ? 'N/F' : '#' + position;

          groupHtml += '<div class="chart-bar-wrapper chart-bar-grouped">' +
            '<div class="chart-bar domain-bg-' + idx + '" style="width: 0%;" data-width="' + barWidth + '">' +
              '<span class="chart-bar-text">' + escapeHtml(barText) + '</span>' +
            '</div></div>';
        });

        groupHtml += '</div></div>';
        chartContainer.insertAdjacentHTML('beforeend', groupHtml);

        domains.forEach(function (domain, idx) {
          var domainData = country.domains[domain];
          var pos = domainData.position;
          var bw = (pos === null || pos === undefined) ? 5 : Math.max(5, 101 - pos);
          (function (bi, bw) {
            setTimeout(function () {
              var bars = chartContainer.querySelectorAll('.chart-bar');
              if (bars[bi]) bars[bi].style.width = bw + '%';
            }, 80 * bi);
          })(barIndex, bw);
          barIndex++;
        });
      }
    });
  }

  // --- Autocomplete ---

  async function fetchSuggestions(query) {
    if (!query || query.length < 2) {
      hideSuggestions();
      return;
    }
    try {
      var response = await fetch('/api/suggestions?q=' + encodeURIComponent(query));
      if (!response.ok) return;
      var data = await response.json();
      renderSuggestions(data.suggestions || []);
    } catch (e) {
      // Non-critical, fail silently
    }
  }

  function renderSuggestions(suggestions) {
    if (suggestions.length === 0) {
      hideSuggestions();
      return;
    }
    suggestionsDropdown.innerHTML = '';
    suggestions.forEach(function (text) {
      var item = document.createElement('div');
      item.className = 'suggestion-item';
      item.textContent = text;
      item.addEventListener('mousedown', function (e) {
        e.preventDefault(); // Prevent blur before click registers
        queryInput.value = text;
        hideSuggestions();
        queryInput.focus();
      });
      suggestionsDropdown.appendChild(item);
    });
    suggestionsDropdown.classList.remove('hidden');
  }

  function hideSuggestions() {
    suggestionsDropdown.classList.add('hidden');
    suggestionsDropdown.innerHTML = '';
    activeSuggestionIndex = -1;
  }

  function updateActiveSuggestion(items) {
    items.forEach(function (item, i) {
      if (i === activeSuggestionIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  var debouncedFetch = debounce(function () {
    activeSuggestionIndex = -1;
    fetchSuggestions(queryInput.value.trim());
  }, 300);

  queryInput.addEventListener('input', debouncedFetch);

  queryInput.addEventListener('keydown', function (e) {
    var items = suggestionsDropdown.querySelectorAll('.suggestion-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeSuggestionIndex = Math.min(activeSuggestionIndex + 1, items.length - 1);
      updateActiveSuggestion(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeSuggestionIndex = Math.max(activeSuggestionIndex - 1, -1);
      updateActiveSuggestion(items);
    } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      e.preventDefault();
      e.stopPropagation();
      queryInput.value = items[activeSuggestionIndex].textContent;
      hideSuggestions();
    } else if (e.key === 'Escape') {
      hideSuggestions();
    }
  });

  queryInput.addEventListener('blur', function () {
    // Small delay so click on suggestion registers first
    setTimeout(hideSuggestions, 150);
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.autocomplete-wrapper')) {
      hideSuggestions();
    }
  });

  // --- Search History ---

  function getHistory() {
    try {
      var raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveHistory(query, domainsStr, timestamp) {
    var history = getHistory();
    history = history.filter(function (entry) {
      return !(entry.query === query && entry.domain === domainsStr);
    });
    history.unshift({ query: query, domain: domainsStr, timestamp: timestamp });
    if (history.length > MAX_HISTORY) {
      history = history.slice(0, MAX_HISTORY);
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }

  function renderHistory() {
    var history = getHistory();
    if (history.length === 0) {
      historySection.style.display = 'none';
      historyList.innerHTML = '';
      return;
    }
    historySection.style.display = '';
    historyList.innerHTML = '';
    history.forEach(function (entry) {
      var chip = document.createElement('button');
      chip.className = 'history-chip';
      chip.type = 'button';
      chip.textContent = entry.query + ' | ' + entry.domain;
      chip.addEventListener('click', function () {
        queryInput.value = entry.query;
        domainInput.value = entry.domain;
        performSearch();
      });
      historyList.appendChild(chip);
    });
  }

  // --- Search ---

  async function performSearch() {
    var query = queryInput.value.trim();
    var domain = domainInput.value.trim();

    if (!query || !domain) {
      showError('Please enter both a search query and at least one domain.');
      return;
    }

    setLoading(true);
    dismissError();
    hideSuggestions();

    try {
      var response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query, domain: domain }),
      });

      if (!response.ok) {
        var errorData;
        try { errorData = await response.json(); } catch (e) { errorData = null; }
        var msg = (errorData && errorData.detail) ? errorData.detail : 'Search failed with status ' + response.status;
        throw new Error(msg);
      }

      var data = await response.json();

      resultsSection.classList.remove('hidden');
      renderSummary(data);
      renderCards(data);
      renderChart(data);

      saveHistory(data.query, data.domains.join(', '), data.timestamp);
      renderHistory();

    } catch (err) {
      showError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  // --- Event Listeners ---

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    performSearch();
  });

  renderHistory();
})();

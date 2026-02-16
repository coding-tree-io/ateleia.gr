(function () {
  var root = document.documentElement;

  function parseSearchParams() {
    if (typeof window.URLSearchParams !== 'function') {
      return null;
    }

    return new window.URLSearchParams(window.location.search || '');
  }

  function getRequestedPathLabel(searchParams) {
    if (searchParams) {
      var pathOverride = searchParams.get('ctPath');
      if (typeof pathOverride === 'string' && pathOverride.trim()) {
        return pathOverride.trim();
      }
    }

    var path = window.location.pathname || '/';
    var query = window.location.search || '';
    return path + query;
  }

  function hasTruthyParam(searchParams, key) {
    if (!searchParams) {
      return false;
    }

    var value = searchParams.get(key);
    if (value === null) {
      return false;
    }

    if (value === '') {
      return true;
    }

    var normalized = String(value).trim().toLowerCase();
    return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
  }

  function isEmbeddedContext() {
    try {
      return window.self !== window.top;
    } catch (error) {
      return true;
    }
  }

  var searchParams = parseSearchParams();
  if (hasTruthyParam(searchParams, 'ctEmbed') && isEmbeddedContext()) {
    root.setAttribute('data-ct-404-embed', 'true');
  }

  var requestedPath = document.getElementById('requested-path');
  if (requestedPath && typeof window.location === 'object') {
    requestedPath.textContent = getRequestedPathLabel(searchParams);
  }
})();

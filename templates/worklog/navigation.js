(function () {
  function comparablePath(url) {
    return url.pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "");
  }

  function getPreviousPageUrl(fallbackUrl) {
    if (!document.referrer) return fallbackUrl;

    try {
      var referrerUrl = new URL(document.referrer);
      var currentUrl = new URL(window.location.href);

      if (
        referrerUrl.origin === currentUrl.origin &&
        comparablePath(referrerUrl) === comparablePath(currentUrl)
      ) {
        return fallbackUrl;
      }

      return referrerUrl.href;
    } catch (error) {
      return fallbackUrl;
    }
  }

  document.addEventListener("click", function (event) {
    var backLink = event.target.closest("[data-page-back]");
    if (!backLink) return;

    event.preventDefault();
    window.location.href = getPreviousPageUrl(backLink.href);
  });
})();

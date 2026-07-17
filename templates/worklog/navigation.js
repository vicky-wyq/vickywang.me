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

(function () {
  var header = document.querySelector(".nav--sticky");
  if (!header) return;

  var lastScrollY = window.scrollY;
  var ticking = false;

  function onScroll() {
    var currentScrollY = window.scrollY;
    var scrolledPastHeader = currentScrollY > header.offsetHeight;

    if (scrolledPastHeader && currentScrollY > lastScrollY) {
      header.classList.add("nav--hidden");
    } else {
      header.classList.remove("nav--hidden");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });
})();

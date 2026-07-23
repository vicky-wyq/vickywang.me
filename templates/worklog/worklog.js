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

(function () {
  var header = document.querySelector(".nav--detail");
  if (!header) return;

  var links = Array.from(header.querySelectorAll("[data-section-link]"));
  var sectionLinks = links
    .map(function (link) {
      var id = link.getAttribute("href");
      if (!id || id.charAt(0) !== "#") return null;

      var section = document.getElementById(id.slice(1));
      return section ? { link: link, section: section } : null;
    })
    .filter(Boolean);

  if (!sectionLinks.length) return;

  var ticking = false;

  function setActiveLink(activeLink) {
    links.forEach(function (link) {
      var isActive = link === activeLink;
      link.classList.toggle("is-active", isActive);
      link.classList.toggle("muted", !isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveSection() {
    var marker = header.offsetHeight + 32;
    var active = sectionLinks[0];

    sectionLinks.forEach(function (item) {
      if (item.section.getBoundingClientRect().top <= marker) {
        active = item;
      }
    });

    setActiveLink(active.link);
    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateActiveSection);
  }

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setActiveLink(link);
    });
  });

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
})();

(function () {
  var header = document.querySelector(".nav--landing");
  if (!header) return;

  var links = Array.from(header.querySelectorAll("[data-landing-link]"));
  if (!links.length) return;

  function setActiveLink(activeLink) {
    links.forEach(function (link) {
      var isActive = link === activeLink;
      link.classList.toggle("is-active", isActive);
      link.classList.toggle("muted", !isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function activateCurrentHash() {
    if (!window.location.hash) return;

    var matchingLink = links.find(function (link) {
      return link.getAttribute("href") === window.location.hash;
    });

    if (matchingLink) setActiveLink(matchingLink);
  }

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setActiveLink(link);
    });
  });

  window.addEventListener("hashchange", activateCurrentHash);
})();

(function () {
  var modal = document.getElementById("wl-image-modal");
  if (!modal) return;

  var modalImg = modal.querySelector(".wl-image-modal__img");
  var caption = modal.querySelector(".wl-image-modal__caption");
  var closeBtn = modal.querySelector(".wl-image-modal__close");
  var prevBtn = modal.querySelector(".wl-image-modal__control--prev");
  var nextBtn = modal.querySelector(".wl-image-modal__control--next");
  var gallery = [];
  var activeIndex = -1;

  function getModalImage(target) {
    return target.matches("img") ? target : target.querySelector("img");
  }

  function setControls() {
    var hasGallery = gallery.length > 1;
    prevBtn.hidden = !hasGallery;
    nextBtn.hidden = !hasGallery;
  }

  function showImage(target) {
    var img = getModalImage(target);
    if (!img) return;

    modalImg.src = img.currentSrc || img.src;
    modalImg.alt = img.alt || "";
    caption.textContent = img.alt || "";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("image-modal-open");
    setControls();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("image-modal-open");
    modalImg.removeAttribute("src");
    gallery = [];
    activeIndex = -1;
  }

  function move(direction) {
    if (gallery.length < 2) return;
    activeIndex = (activeIndex + direction + gallery.length) % gallery.length;
    showImage(gallery[activeIndex]);
  }

  document.addEventListener("click", function (event) {
    var target = event.target.closest(".modal-target");
    if (!target) return;

    var galleryName = target.getAttribute("data-modal-gallery");
    gallery = galleryName
      ? Array.from(document.querySelectorAll('.modal-target[data-modal-gallery="' + galleryName + '"]'))
      : [target];
    activeIndex = gallery.indexOf(target);
    showImage(target);
  });

  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", function () { move(-1); });
  nextBtn.addEventListener("click", function () { move(1); });
  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", function (event) {
    if (!modal.classList.contains("is-open")) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });
})();

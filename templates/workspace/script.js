(function () {
  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.querySelector('[data-theme-toggle]');
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.getAttribute('data-theme') || (media.matches ? 'dark' : 'light');
  }
  function syncThemeLabel() {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    themeBtn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
  }
  if (themeBtn) {
    syncThemeLabel();
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncThemeLabel();
    });
    if (media.addEventListener) media.addEventListener('change', syncThemeLabel);
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.querySelector('[data-copy-email]');
  var copyLabel = document.querySelector('[data-copy-label]');
  var copyStatus = document.querySelector('[data-copy-status]');
  var resetTimer;

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    return ok;
  }
  function showCopied(text) {
    copyLabel.textContent = 'Email copied';
    copyStatus.textContent = text + ' copied to clipboard';
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function () {
      copyLabel.textContent = 'Copy email';
      copyStatus.textContent = '';
    }, 2200);
  }
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-copy-email');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function () { showCopied(email); }, function () {
          if (fallbackCopy(email)) showCopied(email); else window.location.href = 'mailto:' + email;
        });
      } else if (fallbackCopy(email)) {
        showCopied(email);
      } else {
        window.location.href = 'mailto:' + email;
      }
    });
  }

  /* ---------- Dock: highlight the section in view ---------- */
  var dockLinks = Array.prototype.slice.call(document.querySelectorAll('[data-dock]'));
  var sections = dockLinks.map(function (a) { return document.getElementById(a.getAttribute('data-dock')); }).filter(Boolean);

  function setActive(id) {
    dockLinks.forEach(function (a) {
      var on = a.getAttribute('data-dock') === id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }

  function pickSection() {
    // The active section is the last one whose top has passed 40% of the viewport.
    var line = window.innerHeight * 0.4;
    var active = sections[0].id;
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= line) active = s.id;
    });
    // At the very bottom, the last section wins even if it's short.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      active = sections[sections.length - 1].id;
    }
    setActive(active);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { pickSection(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', pickSection);
  pickSection();
})();

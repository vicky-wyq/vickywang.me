(() => {
  const stage = document.querySelector('.marketplace-stage');
  const toggle = document.querySelector('.motion-toggle');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  function updateMotion() {
    stage.classList.toggle('paused', paused);
    const connections = stage.querySelector('.connections');
    if (paused || reduced.matches) connections.pauseAnimations();
    else connections.unpauseAnimations();
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Play motion' : 'Pause motion';
  }
  toggle.addEventListener('click', () => { paused = !paused; updateMotion(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; updateMotion(); });
  stage.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      stage.dataset.focus = button.dataset.filter;
      stage.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    });
  });
  updateMotion();
})();

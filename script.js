// Generate a field of slowly drifting, softly flickering stars
(function makeStars() {
  const sky = document.getElementById('sky');
  const { innerWidth: W, innerHeight: H } = window;
  const AREA = W * H;
  const STAR_COUNT = Math.min(260, Math.max(120, Math.floor(AREA / 8000)));

  for (let i = 0; i < STAR_COUNT; i++) {
    const s = document.createElement('span');
    s.className = 'star';

    // Random position
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';

    // Random size
    const size = 1 + Math.random() * 2;
    s.style.width = size + 'px';
    s.style.height = size + 'px';

    // Random flicker speed & offset
    const flickerDur = 2 + Math.random() * 3; // 2s - 5s
    const driftDur = 10 + Math.random() * 10; // 10s - 20s (slow)
    const flickerDelay = (Math.random() * -flickerDur).toFixed(2);
    const driftDelay = (Math.random() * -driftDur).toFixed(2);

    s.style.animationDuration = flickerDur + 's, ' + driftDur + 's';
    s.style.animationDelay = flickerDelay + 's, ' + driftDelay + 's';

    sky.appendChild(s);
  }

  // Handle resize (debounced)
  let t = 0;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      while (sky.firstChild) sky.removeChild(sky.firstChild);
      makeStars();
    }, 250);
  }, { passive: true });
})();

// Fade in everything on page load
window.addEventListener('load', () => {
  document.body.classList.add('ready');
});

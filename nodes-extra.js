/* ───────────────────────────────────────────────
   nodes-extra.js
   NODE 09 · QualiaRhythmMatrix audit-bar reveal
   ─────────────────────────────────────────────── */

(function () {
  const bars = document.querySelectorAll('.qr-bar');
  if (!bars.length) return;

  const fillBars = () => {
    bars.forEach(bar => {
      const target = bar.dataset.fill || 50;
      bar.style.width = target + '%';
    });
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fillBars();
          io.disconnect();
        }
      });
    }, { threshold: 0.2 });

    const target = document.getElementById('qualia-rhythm');
    if (target) io.observe(target);
  } else {
    setTimeout(fillBars, 600);
  }

  const anchor = document.querySelector('.qr-mg-anchor');
  if (anchor) {
    let t = 0;
    setInterval(() => {
      t += 0.06;
      const glow = 0.04 + Math.sin(t) * 0.025;
      anchor.style.background = `rgba(232,166,48,${glow.toFixed(3)})`;
    }, 60);
  }
})();

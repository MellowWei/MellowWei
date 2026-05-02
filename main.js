/* ============================================================
   MELLOW WEI PORTAL — main.js
   NODE 44271 · FREQ 427Hz
   ============================================================ */

/* ── 1. Live EDT clock in the first sys-line ── */
function tick() {
  const now = new Date();
  const t = now.toLocaleTimeString('en-US', {
    hour12:   false,
    timeZone: 'America/New_York'
  });

  const line = document.querySelector('.sys-line:nth-child(1)');
  if (line) {
    line.innerHTML =
      `// NODE <span>44271</span> · STYLE <span>77347</span> · FREQ <span>427Hz</span> · <span>${t} EDT</span>`;
  }
}

tick();
setInterval(tick, 1000);

/* ── 2. Card entrance via IntersectionObserver ──
   Cards start with animation-play-state: paused (set in CSS).
   The observer resumes the animation when the card enters the viewport,
   creating a staggered reveal without needing scroll-event listeners.    */
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.08 }
);

cards.forEach((card) => observer.observe(card));

/* ── 3. Keyboard nav: press 1–7 to jump to a node ── */
const nodeLinks = Array.from(document.querySelectorAll('.card'));

document.addEventListener('keydown', (e) => {
  const n = parseInt(e.key, 10);
  if (n >= 1 && n <= nodeLinks.length) {
    nodeLinks[n - 1].focus();
    nodeLinks[n - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

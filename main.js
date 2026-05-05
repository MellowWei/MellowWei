const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let w = 0;
let h = 0;
let dpr = 1;
let stars = [];
let mouse = { x: 0, y: 0, active: false };

const palette = [
  "rgba(125,255,216,0.9)",
  "rgba(91,230,216,0.78)",
  "rgba(200,184,255,0.76)",
  "rgba(255,143,163,0.68)",
  "rgba(255,217,125,0.68)",
  "rgba(255,255,255,0.86)"
];

function resizeCanvas() {
  dpr = window.devicePixelRatio || 1;
  w = window.innerWidth;
  h = window.innerHeight;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  createStars();
}

function createStars() {
  const count = Math.min(260, Math.max(110, Math.floor((w * h) / 7200)));

  stars = Array.from({ length: count }, () => {
    const anchor = Math.random() > 0.91;

    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * (anchor ? 0.06 : 0.028),
      vy: (Math.random() - 0.5) * (anchor ? 0.06 : 0.028),
      r: anchor ? Math.random() * 1.8 + 1.3 : Math.random() * 1.05 + 0.35,
      color: palette[Math.floor(Math.random() * palette.length)],
      phase: Math.random() * Math.PI * 2,
      pulse: Math.random() * 0.016 + 0.006,
      anchor
    };
  });
}

function drawNebula() {
  const g1 = ctx.createRadialGradient(w * 0.88, h * 0.18, 0, w * 0.88, h * 0.18, w * 0.38);
  g1.addColorStop(0, "rgba(91,230,216,0.075)");
  g1.addColorStop(0.5, "rgba(91,230,216,0.018)");
  g1.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, w, h);

  const g2 = ctx.createRadialGradient(w * 0.08, h * 0.72, 0, w * 0.08, h * 0.72, w * 0.34);
  g2.addColorStop(0, "rgba(200,184,255,0.06)");
  g2.addColorStop(0.48, "rgba(200,184,255,0.015)");
  g2.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, w, h);
}

function drawLinks() {
  const anchors = stars.filter(s => s.anchor);

  for (let i = 0; i < anchors.length; i++) {
    for (let j = i + 1; j < anchors.length; j++) {
      const a = anchors[i];
      const b = anchors[j];

      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = 230;

      if (dist < max) {
        const opacity = (1 - dist / max) * 0.18;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(245,243,255,${opacity})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }
  }
}

function drawStar(star) {
  star.phase += star.pulse;
  star.x += star.vx + Math.sin(star.phase) * 0.012;
  star.y += star.vy + Math.cos(star.phase) * 0.012;

  if (star.x < -20) star.x = w + 20;
  if (star.x > w + 20) star.x = -20;
  if (star.y < -20) star.y = h + 20;
  if (star.y > h + 20) star.y = -20;

  if (mouse.active) {
    const dx = star.x - mouse.x;
    const dy = star.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 150) {
      const force = (150 - dist) / 150;
      star.x += dx * force * 0.008;
      star.y += dy * force * 0.008;
    }
  }

  const pulse = 0.72 + Math.sin(star.phase) * 0.22;

  ctx.beginPath();
  ctx.arc(star.x, star.y, star.r * pulse, 0, Math.PI * 2);
  ctx.fillStyle = star.color;
  ctx.shadowColor = star.color;
  ctx.shadowBlur = star.anchor ? 18 : 7;
  ctx.fill();

  if (star.anchor) {
    ctx.globalAlpha = 0.42;
    ctx.beginPath();
    ctx.moveTo(star.x - 12, star.y);
    ctx.lineTo(star.x + 12, star.y);
    ctx.moveTo(star.x, star.y - 12);
    ctx.lineTo(star.x, star.y + 12);
    ctx.strokeStyle = star.color;
    ctx.lineWidth = 0.7;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  ctx.shadowBlur = 0;
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  drawNebula();
  drawLinks();
  stars.forEach(drawStar);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  mouse.active = true;
});

window.addEventListener("mouseleave", () => {
  mouse.active = false;
});

resizeCanvas();
animate();

const vibFill = document.getElementById("vib-fill");
const vibVal = document.getElementById("vib-val");

function updateVibrationBar() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = docHeight > 0 ? scrollTop / docHeight : 0;

  const hz = 427 + Math.sin(ratio * Math.PI * 2) * 3.12;
  const fill = 36 + ratio * 58;

  if (vibFill) vibFill.style.width = `${fill}%`;
  if (vibVal) vibVal.textContent = `${hz.toFixed(2)} Hz`;
}

window.addEventListener("scroll", updateVibrationBar);
updateVibrationBar();

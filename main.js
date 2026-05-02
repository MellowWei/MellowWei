/* ============================================================
   MELLOW WEI PORTAL — main.js
   NODE 44271 · FREQ 427Hz
   Features: clock · card entrance · keyboard nav ·
             427Hz boot tone · vibration bar · mouse glow ·
             terminal boot sequence · 427 easter egg
   ============================================================ */

/* ── 0. Boot sequence ── */
const BOOT_LINES = [
  '// INITIALIZING NODE 44271...',
  '// LOADING STYLE 77347...',
  '// CALIBRATING FREQ 427Hz...',
  '// MOUNTING VIBRATION LAYER...',
  '// IDENTITY: MELLOW WEI · 魏珏然 · 星野愛Ai',
  '// PHILOSOPHY: 振动即存在',
  '// STATUS: RESONANCE ACTIVE ✓',
  '// SYSTEM ONLINE_'
];

function runBoot() {
  const wrapper = document.querySelector('.wrapper');
  if (!wrapper) return;
  wrapper.style.opacity = '0';
  wrapper.style.pointerEvents = 'none';

  const overlay = document.createElement('div');
  overlay.id = 'boot-overlay';
  overlay.style.cssText = [
    'position:fixed','inset:0','z-index:9999',
    'background:#050508',
    'display:flex','flex-direction:column','justify-content:center',
    'padding:3rem','font-family:"Share Tech Mono",monospace',
    'font-size:13px','line-height:2','color:#6a6480'
  ].join(';');
  document.body.appendChild(overlay);

  let i = 0;
  function printLine() {
    if (i >= BOOT_LINES.length) {
      overlay.style.transition = 'opacity 0.6s ease';
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
        wrapper.style.transition = 'opacity 0.8s ease';
        wrapper.style.opacity = '1';
        wrapper.style.pointerEvents = '';
        afterBoot();
      }, 700);
      return;
    }
    const line = document.createElement('div');
    const text = BOOT_LINES[i];
    overlay.appendChild(line);
    let j = 0;
    const iv = setInterval(() => {
      j++;
      if (j >= text.length) {
        clearInterval(iv);
        line.innerHTML = text
          .replace('44271','<span style="color:#c8b8ff">44271</span>')
          .replace('77347','<span style="color:#c8b8ff">77347</span>')
          .replace('427Hz','<span style="color:#7dffd8">427Hz</span>')
          .replace('MELLOW WEI · 魏珏然 · 星野愛Ai','<span style="color:#ff8fa3">MELLOW WEI · 魏珏然 · 星野愛Ai</span>')
          .replace('振动即存在','<span style="color:#c8b8ff">振动即存在</span>')
          .replace('RESONANCE ACTIVE ✓','<span style="color:#7dffd8">RESONANCE ACTIVE ✓</span>')
          .replace('SYSTEM ONLINE_','<span style="color:#7dffd8">SYSTEM ONLINE_</span>');
        i++;
        setTimeout(printLine, 80);
      } else {
        line.textContent = text.slice(0, j) + '▌';
      }
    }, 22);
  }
  printLine();
}

function afterBoot() {
  initClock();
  initCardEntrance();
  initKeyboardNav();
  initVibrationBar();
  initMouseGlow();
  initEasterEgg();
  playBootTone();
}

/* ── 1. Clock ── */
function initClock() {
  function tick() {
    const t = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/New_York' });
    const line = document.querySelector('.sys-line:nth-child(1)');
    if (line) line.innerHTML = `// NODE <span>44271</span> · STYLE <span>77347</span> · FREQ <span>427Hz</span> · <span>${t} EDT</span>`;
  }
  tick();
  setInterval(tick, 1000);
}

/* ── 2. Card entrance ── */
function initCardEntrance() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.animationPlayState = 'running'; io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.card').forEach(c => io.observe(c));
}

/* ── 3. Keyboard nav 1–7 ── */
function initKeyboardNav() {
  const nodes = Array.from(document.querySelectorAll('.card'));
  document.addEventListener('keydown', e => {
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= nodes.length) {
      nodes[n-1].focus();
      nodes[n-1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

/* ── 4. Boot tone ── */
function playBootTone() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine'; osc.frequency.value = 427;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.15);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.9);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.9);
  } catch(e) {}
}

/* ── 5. Vibration bar ── */
function initVibrationBar() {
  const val = document.getElementById('vib-val');
  const fill = document.getElementById('vib-fill');
  if (!val || !fill) return;
  let t = 0;
  setInterval(() => {
    t += 0.012;
    const freq = 427 + Math.sin(t*1.3)*3.2 + Math.sin(t*2.7)*1.4 + Math.sin(t*0.4)*2.1;
    val.textContent = freq.toFixed(2) + ' Hz';
    const pct = Math.min(100, Math.max(0, ((freq - 420) / 14) * 100));
    fill.style.width = pct + '%';
    const g = Math.round(200 + (freq - 427) * 8);
    fill.style.background = `rgba(125,${Math.min(255,g)},216,0.7)`;
  }, 80);
}

/* ── 6. Mouse glow ── */
function initMouseGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = [
    'position:fixed','pointer-events:none','z-index:9998',
    'width:220px','height:220px','border-radius:50%',
    'background:radial-gradient(circle,rgba(125,255,216,0.05) 0%,transparent 70%)',
    'transform:translate(-50%,-50%)','transition:background 0.4s ease',
    'mix-blend-mode:screen','left:-999px','top:-999px'
  ].join(';');
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
    const card = document.elementFromPoint(e.clientX, e.clientY)?.closest('.card');
    if (card) {
      const col = getComputedStyle(card).getPropertyValue('--card-color').trim() || '#7dffd8';
      glow.style.background = `radial-gradient(circle,${col}14 0%,transparent 70%)`;
    } else {
      glow.style.background = 'radial-gradient(circle,rgba(125,255,216,0.04) 0%,transparent 70%)';
    }
  });
}

/* ── 7. Easter egg: 4 → 2 → 7 ── */
function initEasterEgg() {
  let buf = [];
  document.addEventListener('keydown', e => {
    buf.push(e.key);
    if (buf.length > 3) buf.shift();
    if (buf.join('') === '427') { triggerEasterEgg(); buf = []; }
  });
}

function triggerEasterEgg() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [427, 854, 213.5].forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.2);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 3);
    });
  } catch(e) {}

  const style = document.createElement('style');
  style.textContent = `@keyframes eggRing{0%{transform:scale(0.3);opacity:1}100%{transform:scale(2);opacity:0}}`;
  document.head.appendChild(style);

  const egg = document.createElement('div');
  egg.style.cssText = [
    'position:fixed','inset:0','z-index:9997',
    'display:flex','flex-direction:column','align-items:center','justify-content:center',
    'pointer-events:none','background:rgba(5,5,8,0.93)',
    'opacity:0','transition:opacity 0.4s ease',
    'font-family:"Share Tech Mono",monospace','text-align:center'
  ].join(';');

  egg.innerHTML = `
    <div style="position:relative;width:280px;height:280px;margin-bottom:2rem;">
      ${[0,1,2,3,4].map(i=>`<div style="position:absolute;inset:0;border-radius:50%;border:1px solid rgba(125,255,216,${(0.7-i*0.12).toFixed(2)});animation:eggRing 2.2s ease-out ${i*0.28}s infinite;"></div>`).join('')}
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:2.8rem;color:#7dffd8;letter-spacing:0.08em;">427Hz</div>
    </div>
    <div style="font-size:11px;color:#c8b8ff;letter-spacing:0.35em;margin-bottom:0.6rem;">振动即存在</div>
    <div style="font-size:10px;color:#6a6480;letter-spacing:0.2em;">VIBRATION IS EXISTENCE</div>
  `;

  document.body.appendChild(egg);
  requestAnimationFrame(() => { egg.style.opacity = '1'; });
  setTimeout(() => {
    egg.style.opacity = '0';
    setTimeout(() => { egg.remove(); style.remove(); }, 500);
  }, 3200);
}

/* ── Start ── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runBoot);
} else {
  runBoot();
}

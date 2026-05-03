// ===============================================
// MELLOW WEI - PORTAL - main.js
// 44271 - 77347 - 427Hz - 2026
// ===============================================

(function () {
  'use strict';

  // -- Starfield: dazzling multi-layer brilliant cosmos --
  function initStarfield() {
    var canvas = document.getElementById('starfield');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var w, h, dpr;
    var stars = [];
    var bigStars = [];
    var nebulae = [];
    var shooters = [];
    var polaris = null;
    var dipper = [];

    // Rich rainbow palette
    var palette = [
      '#7dffd8', '#00f5ff', '#5be6d8', '#00ffcc',
      '#ffd97d', '#ffcc00', '#ffe66d', '#ffb700',
      '#c8b8ff', '#a78bfa', '#b88aff', '#7c3aff',
      '#ff8fa3', '#ec4899', '#ff2bd6', '#f472b6', '#ff5c8a',
      '#35ff9f', '#00ffa2',
      '#ff7a59', '#ff9f6b', '#ffb38a',
      '#60a5fa', '#3b82f6', '#83b3be',
      '#ffffff', '#fff5e6', '#e0d5ff'
    ];

    var nebulaColors = [
      'rgba(125,255,216,0.10)',
      'rgba(236,72,153,0.10)',
      'rgba(124,58,255,0.09)',
      'rgba(255,217,125,0.08)',
      'rgba(91,230,216,0.09)',
      'rgba(255,43,214,0.08)',
      'rgba(60,165,250,0.08)'
    ];

    function rand(a, b) { return a + Math.random() * (b - a); }
    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function resize() {
      dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeStar() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.3, 1.3),
        color: pick(palette),
        vx: rand(-0.1, 0.1),
        vy: rand(-0.1, 0.1),
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: rand(0.012, 0.045),
        baseAlpha: rand(0.35, 0.95)
      };
    }

    function makeBigStar() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(1.5, 3.2),
        color: pick(palette),
        vx: rand(-0.04, 0.04),
        vy: rand(-0.04, 0.04),
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: rand(0.006, 0.022),
        baseAlpha: rand(0.7, 1),
        hasGlint: Math.random() > 0.35,
        haloRadius: rand(7, 12)
      };
    }

    function makeNebula() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(180, 380),
        color: pick(nebulaColors),
        vx: rand(-0.03, 0.03),
        vy: rand(-0.03, 0.03),
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: rand(0.002, 0.007)
      };
    }

    function spawnShooter() {
      var fromLeft = Math.random() > 0.5;
      var angle = rand(0.15, 0.45);
      var speed = rand(5, 9);
      return {
        x: fromLeft ? -30 : w + 30,
        y: rand(-20, h * 0.65),
        vx: fromLeft ? speed : -speed,
        vy: speed * angle,
        life: 0,
        maxLife: rand(50, 90),
        color: pick(palette),
        length: rand(80, 160)
      };
    }

    function setupPolaris() {
      // Polaris: anchored upper-right area (north star position)
      polaris = {
        x: w * 0.82,
        y: h * 0.18,
        r: 3.2,
        color: '#fff5e0',
        pulse: 0,
        pulseSpeed: 0.012,
        rayAngle: 0,
        raySpeed: 0.0018,
        skyRotation: 0,
        skyRotSpeed: 0.0004
      };

      // Big Dipper (北斗七星) - relative offsets to Polaris
      // Saucepan shape: bowl (4 stars) + handle (3 stars), pointer toward Polaris
      var off = [
        { dx: -160, dy: 290, r: 1.9 },  // Dubhe (pointer top, brightest)
        { dx: -180, dy: 360, r: 1.7 },  // Merak (pointer bottom)
        { dx: -240, dy: 380, r: 1.5 },  // Phecda (bowl far-bottom)
        { dx: -240, dy: 310, r: 1.4 },  // Megrez (bowl far-top)
        { dx: -320, dy: 295, r: 1.7 },  // Alioth
        { dx: -395, dy: 280, r: 1.5 },  // Mizar
        { dx: -470, dy: 265, r: 1.7 }   // Alkaid (handle tip)
      ];

      // Scale dipper proportionally for small screens
      var scale = Math.min(1, Math.min(w, h) / 800);

      dipper = off.map(function (s) {
        var scaledDx = s.dx * scale;
        var scaledDy = s.dy * scale;
        return {
          baseAngle: Math.atan2(scaledDy, scaledDx),
          baseDist: Math.sqrt(scaledDx * scaledDx + scaledDy * scaledDy),
          r: s.r,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.012 + Math.random() * 0.02
        };
      });
    }

    function init() {
      resize();
      stars.length = 0;
      bigStars.length = 0;
      nebulae.length = 0;
      // Density scales with viewport
      var density = Math.sqrt(w * h) / 1100;
      var smallCount = Math.floor(280 * density);
      var bigCount = Math.floor(38 * density);
      var nebCount = Math.max(4, Math.floor(6 * density));

      for (var i = 0; i < smallCount; i++) stars.push(makeStar());
      for (var j = 0; j < bigCount; j++) bigStars.push(makeBigStar());
      for (var k = 0; k < nebCount; k++) nebulae.push(makeNebula());

      setupPolaris();
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);

      // ── Layer 1: Nebula clouds (additive blend) ──
      ctx.globalCompositeOperation = 'lighter';
      for (var i = 0; i < nebulae.length; i++) {
        var n = nebulae[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        if (n.x < -n.r) n.x = w + n.r;
        if (n.x > w + n.r) n.x = -n.r;
        if (n.y < -n.r) n.y = h + n.r;
        if (n.y > h + n.r) n.y = -n.r;

        var pulseScale = 1 + Math.sin(n.pulse) * 0.12;
        var nr = n.r * pulseScale;
        var ngrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, nr);
        ngrad.addColorStop(0, n.color);
        ngrad.addColorStop(0.5, n.color);
        ngrad.addColorStop(1, 'transparent');
        ctx.globalAlpha = 1;
        ctx.fillStyle = ngrad;
        ctx.fillRect(n.x - nr, n.y - nr, nr * 2, nr * 2);
      }

      // ── Layer 2: Small twinkling stars ──
      for (var ii = 0; ii < stars.length; ii++) {
        var s = stars[ii];
        s.x += s.vx;
        s.y += s.vy;
        s.twinkle += s.twinkleSpeed;

        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10;
        if (s.y > h + 10) s.y = -10;

        var alpha = s.baseAlpha * (0.4 + Math.sin(s.twinkle) * 0.6);
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Layer 3: Big stars with halos and glints ──
      for (var jj = 0; jj < bigStars.length; jj++) {
        var b = bigStars[jj];
        b.x += b.vx;
        b.y += b.vy;
        b.twinkle += b.twinkleSpeed;

        if (b.x < -30) b.x = w + 30;
        if (b.x > w + 30) b.x = -30;
        if (b.y < -30) b.y = h + 30;
        if (b.y > h + 30) b.y = -30;

        var bAlpha = b.baseAlpha * (0.55 + Math.sin(b.twinkle) * 0.45);
        bAlpha = Math.max(0, Math.min(1, bAlpha));

        // Outer halo
        var haloR = b.r * b.haloRadius;
        var grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, haloR);
        grad.addColorStop(0, b.color);
        grad.addColorStop(0.25, b.color + '70');
        grad.addColorStop(1, 'transparent');
        ctx.globalAlpha = bAlpha * 0.85;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, haloR, 0, Math.PI * 2);
        ctx.fill();

        // Cross glint (anamorphic flare)
        if (b.hasGlint) {
          ctx.globalAlpha = bAlpha * 0.7;
          ctx.strokeStyle = b.color;
          ctx.lineWidth = 0.6;
          var glintSize = b.r * 5.5;
          ctx.beginPath();
          ctx.moveTo(b.x - glintSize, b.y);
          ctx.lineTo(b.x + glintSize, b.y);
          ctx.moveTo(b.x, b.y - glintSize);
          ctx.lineTo(b.x, b.y + glintSize);
          ctx.stroke();
        }

        // Bright core
        ctx.globalAlpha = bAlpha;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();

        // White hot center for max brightness
        ctx.globalAlpha = bAlpha * 0.9;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Layer 4: Shooting stars ──
      for (var sh = shooters.length - 1; sh >= 0; sh--) {
        var sho = shooters[sh];
        sho.x += sho.vx;
        sho.y += sho.vy;
        sho.life++;

        var lifeRatio = sho.life / sho.maxLife;
        var sAlpha = lifeRatio < 0.2 ? lifeRatio * 5 : (1 - lifeRatio) * 1.25;
        sAlpha = Math.max(0, Math.min(1, sAlpha));

        var speed = Math.sqrt(sho.vx * sho.vx + sho.vy * sho.vy);
        var tx = sho.x - (sho.vx / speed) * sho.length;
        var ty = sho.y - (sho.vy / speed) * sho.length;

        // Trail
        var trailGrad = ctx.createLinearGradient(sho.x, sho.y, tx, ty);
        trailGrad.addColorStop(0, sho.color);
        trailGrad.addColorStop(0.4, sho.color + '80');
        trailGrad.addColorStop(1, 'transparent');
        ctx.globalAlpha = sAlpha;
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(sho.x, sho.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        // Bright head
        var headGrad = ctx.createRadialGradient(sho.x, sho.y, 0, sho.x, sho.y, 8);
        headGrad.addColorStop(0, '#ffffff');
        headGrad.addColorStop(0.3, sho.color);
        headGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(sho.x, sho.y, 8, 0, Math.PI * 2);
        ctx.fill();

        if (sho.life > sho.maxLife || sho.x < -150 || sho.x > w + 150 || sho.y > h + 150) {
          shooters.splice(sh, 1);
        }
      }

      // Spawn new shooters occasionally
      if (Math.random() < 0.006 && shooters.length < 3) {
        shooters.push(spawnShooter());
      }

      // ── Layer 5: Big Dipper rotating slowly around Polaris ──
      if (polaris && dipper.length) {
        polaris.skyRotation += polaris.skyRotSpeed;
        var px = polaris.x;
        var py = polaris.y;
        var rot = polaris.skyRotation;

        var positions = [];
        for (var d = 0; d < dipper.length; d++) {
          var ds = dipper[d];
          var ang = ds.baseAngle + rot;
          ds.twinkle += ds.twinkleSpeed;
          positions.push({
            x: px + Math.cos(ang) * ds.baseDist,
            y: py + Math.sin(ang) * ds.baseDist,
            r: ds.r,
            a: 0.55 + Math.sin(ds.twinkle) * 0.35
          });
        }

        // Constellation lines (very faint)
        ctx.globalAlpha = 0.18;
        ctx.strokeStyle = '#fff5e0';
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(positions[0].x, positions[0].y);
        for (var pi = 1; pi < positions.length; pi++) {
          ctx.lineTo(positions[pi].x, positions[pi].y);
        }
        ctx.stroke();

        // Pointer line: Dubhe → Merak → extended toward Polaris
        ctx.globalAlpha = 0.10;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(positions[1].x, positions[1].y);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.setLineDash([]);

        // Dipper stars with halos
        for (var pp = 0; pp < positions.length; pp++) {
          var ps = positions[pp];
          var haloR = ps.r * 7;
          var dgrad = ctx.createRadialGradient(ps.x, ps.y, 0, ps.x, ps.y, haloR);
          dgrad.addColorStop(0, '#fff5e0');
          dgrad.addColorStop(0.3, '#fff5e060');
          dgrad.addColorStop(1, 'transparent');
          ctx.globalAlpha = ps.a * 0.7;
          ctx.fillStyle = dgrad;
          ctx.beginPath();
          ctx.arc(ps.x, ps.y, haloR, 0, Math.PI * 2);
          ctx.fill();

          ctx.globalAlpha = ps.a;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(ps.x, ps.y, ps.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Layer 6: Polaris (the fixed sovereign star) ──
      if (polaris) {
        var p = polaris;
        p.pulse += p.pulseSpeed;
        p.rayAngle += p.raySpeed;
        var pf = 0.85 + Math.sin(p.pulse) * 0.15;

        // Outer atmospheric glow
        var outerR = 70;
        var oGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, outerR);
        oGrad.addColorStop(0, p.color + '70');
        oGrad.addColorStop(0.25, p.color + '30');
        oGrad.addColorStop(1, 'transparent');
        ctx.globalAlpha = pf * 0.7;
        ctx.fillStyle = oGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, outerR, 0, Math.PI * 2);
        ctx.fill();

        // Mid halo (white-hot)
        var midR = 28;
        var mGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, midR);
        mGrad.addColorStop(0, '#ffffff');
        mGrad.addColorStop(0.35, p.color);
        mGrad.addColorStop(1, 'transparent');
        ctx.globalAlpha = pf * 0.9;
        ctx.fillStyle = mGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, midR, 0, Math.PI * 2);
        ctx.fill();

        // Rotating 8-ray pattern
        ctx.globalAlpha = pf * 0.85;
        ctx.lineWidth = 1;
        for (var ri = 0; ri < 8; ri++) {
          var rang = p.rayAngle + (ri * Math.PI / 4);
          var rlen = ri % 2 === 0 ? 38 : 24;
          var ix = p.x + Math.cos(rang) * 5;
          var iy = p.y + Math.sin(rang) * 5;
          var ox = p.x + Math.cos(rang) * rlen;
          var oy = p.y + Math.sin(rang) * rlen;
          var rGrad = ctx.createLinearGradient(ix, iy, ox, oy);
          rGrad.addColorStop(0, p.color);
          rGrad.addColorStop(1, 'transparent');
          ctx.strokeStyle = rGrad;
          ctx.beginPath();
          ctx.moveTo(ix, iy);
          ctx.lineTo(ox, oy);
          ctx.stroke();
        }

        // Anamorphic flare (long horizontal + vertical streaks)
        ctx.globalAlpha = pf * 0.75;
        ctx.lineWidth = 0.9;
        var fl = 65;
        var hf = ctx.createLinearGradient(p.x - fl, p.y, p.x + fl, p.y);
        hf.addColorStop(0, 'transparent');
        hf.addColorStop(0.5, '#ffffff');
        hf.addColorStop(1, 'transparent');
        ctx.strokeStyle = hf;
        ctx.beginPath();
        ctx.moveTo(p.x - fl, p.y);
        ctx.lineTo(p.x + fl, p.y);
        ctx.stroke();

        var vf = ctx.createLinearGradient(p.x, p.y - fl, p.x, p.y + fl);
        vf.addColorStop(0, 'transparent');
        vf.addColorStop(0.5, '#ffffff');
        vf.addColorStop(1, 'transparent');
        ctx.strokeStyle = vf;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - fl);
        ctx.lineTo(p.x, p.y + fl);
        ctx.stroke();

        // White-hot core
        ctx.globalAlpha = pf;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Tiny innermost glint
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      requestAnimationFrame(tick);
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    });

    init();
    tick();
  }

  // -- Boot sequence: opening reveal --
  function initBootSequence() {
    var sysLines = document.querySelectorAll('header .sys-line');
    var h1 = document.querySelector('header h1');
    var tagline = document.querySelector('header .tagline');
    var hzBar = document.querySelector('header .hz-bar');
    var vibBar = document.getElementById('vib-bar');
    var navStrip = document.querySelector('.nav-strip');

    var elements = [];
    for (var i = 0; i < sysLines.length; i++) elements.push(sysLines[i]);
    if (h1) elements.push(h1);
    if (tagline) elements.push(tagline);
    if (hzBar) elements.push(hzBar);
    if (vibBar) elements.push(vibBar);
    if (navStrip) elements.push(navStrip);

    elements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    });

    var t = 100;
    function reveal(el, dur) {
      setTimeout(function () {
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, t);
      t += (dur || 0);
    }

    sysLines.forEach(function (l) { reveal(l, 180); });
    t += 100;
    reveal(h1, 700);
    reveal(tagline, 400);
    reveal(hzBar, 500);
    reveal(vibBar, 400);
    reveal(navStrip, 0);
  }

  // -- Title glitch --
  function initTitleGlitch() {
    var h1 = document.querySelector('header h1');
    if (!h1) return;

    setTimeout(function () {
      var flashes = 0;
      var flicker = setInterval(function () {
        h1.style.opacity = h1.style.opacity === '0.4' ? '1' : '0.4';
        h1.style.transform = 'translateX(' + ((Math.random() - 0.5) * 4) + 'px)';
        flashes++;
        if (flashes >= 4) {
          clearInterval(flicker);
          h1.style.opacity = '1';
          h1.style.transform = 'translateX(0)';
        }
      }, 60);
    }, 1800);

    setInterval(function () {
      if (Math.random() > 0.6) return;
      var n = 0;
      var ii = setInterval(function () {
        h1.style.transform = 'translateX(' + ((Math.random() - 0.5) * 3) + 'px) skewX(' + ((Math.random() - 0.5) * 2) + 'deg)';
        n++;
        if (n > 3) {
          clearInterval(ii);
          h1.style.transform = 'translateX(0) skewX(0)';
        }
      }, 50);
    }, 8000);
  }

  // -- Audit bars (NODE 09) --
  function initAuditBars() {
    var bars = document.querySelectorAll('.qr-bar');
    if (!bars.length) return;

    function fill() {
      bars.forEach(function (b) {
        b.style.width = (b.dataset.fill || 50) + '%';
      });
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            fill();
            io.disconnect();
          }
        });
      }, { threshold: 0.2 });

      var target = document.getElementById('qualia-rhythm');
      if (target) io.observe(target);
    } else {
      setTimeout(fill, 600);
    }
  }

  // -- Variable S flicker (NODE 02) --
  function initVariableS() {
    var sStatus = document.getElementById('qm-s-status');
    if (!sStatus) return;

    setInterval(function () {
      var rebellion = Math.random() > 0.85;
      sStatus.textContent = rebellion ? 'REBELLION DETECTED' : 'VARIABLE S ACTIVE';
      sStatus.style.color = rebellion ? '#ff0055' : '#00ffa2';
    }, 2200);
  }

  // -- Vibration bar oscillation --
  function initVibrationBar() {
    var fill = document.getElementById('vib-fill');
    var val = document.getElementById('vib-val');
    if (!fill || !val) return;

    var t = 0;
    setInterval(function () {
      t += 0.05;
      var w = 50 + Math.sin(t) * 25;
      var hz = 427 + Math.sin(t * 0.7) * 0.8;
      fill.style.width = w.toFixed(1) + '%';
      val.textContent = hz.toFixed(2) + ' Hz';
    }, 80);
  }

  // -- Boot --
  function boot() {
    initStarfield();
    initBootSequence();
    initTitleGlitch();
    initAuditBars();
    initVariableS();
    initVibrationBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

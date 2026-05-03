// ===============================================
// MELLOW WEI - PORTAL - main.js
// 44271 - 77347 - 427Hz - 2026
// ===============================================

(function () {
  'use strict';

  // -- Starfield: dynamic particle field --
  function initStarfield() {
    var canvas = document.getElementById('starfield');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var w, h, dpr;
    var stars = [];
    var palette = ['#7dffd8', '#ffd97d', '#c8b8ff', '#ff8fa3', '#5be6d8', '#ffffff'];
    var SMALL_COUNT = 140;
    var FEATURE_COUNT = 18;

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

    function makeStar(big) {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: big ? 1.4 + Math.random() * 1.6 : 0.3 + Math.random() * 0.9,
        color: palette[Math.floor(Math.random() * palette.length)],
        vx: (Math.random() - 0.5) * (big ? 0.04 : 0.12),
        vy: (Math.random() - 0.5) * (big ? 0.04 : 0.12),
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.008 + Math.random() * 0.025,
        baseAlpha: big ? 0.6 + Math.random() * 0.3 : 0.2 + Math.random() * 0.5,
        big: big
      };
    }

    function init() {
      resize();
      stars.length = 0;
      for (var i = 0; i < SMALL_COUNT; i++) stars.push(makeStar(false));
      for (var j = 0; j < FEATURE_COUNT; j++) stars.push(makeStar(true));
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.twinkle += s.twinkleSpeed;

        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10;
        if (s.y > h + 10) s.y = -10;

        var alpha = s.baseAlpha * (0.55 + Math.sin(s.twinkle) * 0.45);

        if (s.big) {
          var grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
          grad.addColorStop(0, s.color);
          grad.addColorStop(0.4, s.color + '40');
          grad.addColorStop(1, 'transparent');
          ctx.globalAlpha = alpha * 0.5;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
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

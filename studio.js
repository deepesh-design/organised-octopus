/* Studio page motion. Vanilla, transform/opacity only. Starts after the loading screen lifts. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var root, vw, vh, mobile;
  var parallax = [], words = [], proc, track, panels = [], bar, countEl, tick, tickIn, tickX = 0, tickHalf = 0;
  var lastY = window.scrollY, vel = 0, fill;
  var peek, peekImgs = [], peekT = { x: -999, y: -999 }, peekC = { x: -999, y: -999 }, peekOn = false;

  function split(el) {
    var text = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', text.join(' '));
    el.innerHTML = '';
    text.forEach(function (t, i) {
      var s = document.createElement('span');
      s.className = 'w'; s.setAttribute('aria-hidden', 'true');
      s.textContent = t;
      el.appendChild(s); words.push(s);
      if (i < text.length - 1) el.appendChild(document.createTextNode(' '));
    });
  }

  function measure() {
    vw = window.innerWidth; vh = window.innerHeight; mobile = vw <= 767;
    if (proc && track) {
      if (mobile) { proc.style.height = ''; }
      else {
        var span = track.scrollWidth - vw;
        proc.style.height = (span + vh) + 'px';
      }
    }
    if (tickIn) tickHalf = tickIn.scrollWidth / 2;
  }

  function frame() {
    var y = window.scrollY;
    vel += ((y - lastY) - vel) * 0.12; lastY = y;

    if (!reduce) {
      // image parallax
      for (var i = 0; i < parallax.length; i++) {
        var img = parallax[i], r = img.parentNode.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        var c = (r.top + r.height / 2 - vh / 2) / vh;
        var sp = parseFloat(img.getAttribute('data-speed')) || 0.08;
        img.style.transform = 'translate3d(0,' + clamp(c * -sp * 100, -6, 6).toFixed(2) + '%,0) scale(1.14)';
      }
    }

    // word fill
    if (fill && words.length) {
      var fr = fill.getBoundingClientRect();
      var p = reduce ? 1 : clamp((vh * 0.82 - fr.top) / (fr.height + vh * 0.28), 0, 1);
      var n = Math.round(p * words.length);
      for (var k = 0; k < words.length; k++) words[k].classList.toggle('on', k < n);
    }

    // pinned horizontal process
    if (proc && track && !mobile) {
      var pr = proc.getBoundingClientRect();
      var tot = proc.offsetHeight - vh;
      var pp = clamp((-pr.top / tot - 0.06) / 0.88, 0, 1); // hold briefly at both ends
      var span = track.scrollWidth - vw;
      track.style.transform = 'translate3d(' + (-pp * span).toFixed(1) + 'px,0,0)';
      if (bar) bar.style.transform = 'scaleX(' + pp.toFixed(4) + ')';
      var cur = Math.min(panels.length - 1, Math.floor(pp * panels.length));
      if (countEl && countEl.getAttribute('data-c') !== String(cur)) {
        countEl.setAttribute('data-c', cur); countEl.textContent = '0' + (cur + 1);
      }
      for (var j = 0; j < panels.length; j++) {
        var im = panels[j].querySelector('.st-visual img');
        if (im && !reduce) {
          var d = j - pp * (panels.length - 1);
          im.style.transform = 'translate3d(' + (d * -5).toFixed(2) + '%,0,0) scale(1.12)';
        }
        if (Math.abs(j - pp * (panels.length - 1)) < 0.55) panels[j].classList.add('in');
      }
    }

    // ticker, reacts to scroll velocity
    if (tick && tickIn && !reduce) {
      var tr = tick.getBoundingClientRect();
      if (tr.bottom > 0 && tr.top < vh) {
        tickX -= 0.7 + vel * 0.35;
        if (tickHalf) { tickX = tickX % tickHalf; if (tickX > 0) tickX -= tickHalf; }
        tickIn.style.transform = 'translate3d(' + tickX.toFixed(1) + 'px,0,0)';
      }
    }

    // cursor-following peek image
    if (peek) {
      peekC.x += (peekT.x - peekC.x) * 0.14; peekC.y += (peekT.y - peekC.y) * 0.14;
      var dx = (peekT.x - peekC.x) * 0.04;
      peek.style.transform = 'translate3d(' + (peekC.x + 28).toFixed(1) + 'px,' + (peekC.y - 120).toFixed(1) + 'px,0) rotate(' + clamp(dx, -6, 6).toFixed(2) + 'deg) scale(' + (peekOn ? 1 : 0.9) + ')';
    }
    requestAnimationFrame(frame);
  }

  function init() {
    root = document.querySelector('.st');
    if (!root) return false;
    document.documentElement.classList.add('st-go');

    // reveals
    var targets = [].slice.call(root.querySelectorAll('[data-in]'));
    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      targets.forEach(function (t) { io.observe(t); });
    }

    parallax = [].slice.call(root.querySelectorAll('.st-img img[data-speed]'));
    fill = root.querySelector('.st-fill'); if (fill) split(fill);
    proc = root.querySelector('.st-proc'); track = root.querySelector('.st-track');
    panels = [].slice.call(root.querySelectorAll('.st-panel'));
    bar = root.querySelector('.st-bar > span'); countEl = root.querySelector('.st-count i b');
    tick = root.querySelector('.st-tick'); tickIn = root.querySelector('.st-tick-in');

    // spaces peek
    var list = root.querySelector('.st-list');
    peek = document.querySelector('.st-peek');
    if (list && peek) {
      peekImgs = [].slice.call(peek.querySelectorAll('img'));
      var rows = [].slice.call(list.querySelectorAll('.st-row'));
      rows.forEach(function (row, i) {
        row.addEventListener('mouseenter', function () {
          peekImgs.forEach(function (im, k) { im.classList.toggle('on', k === i); });
        });
      });
      list.addEventListener('mouseenter', function () { peekOn = true; peek.classList.add('on'); });
      list.addEventListener('mouseleave', function () { peekOn = false; peek.classList.remove('on'); });
      list.addEventListener('mousemove', function (e) { peekT.x = e.clientX; peekT.y = e.clientY; if (peekC.x < -500) { peekC.x = peekT.x; peekC.y = peekT.y; } }, { passive: true });
    }

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    setTimeout(measure, 600);
    requestAnimationFrame(frame);
    return true;
  }

  // wait for the template runtime to render and the loading screen to lift
  function boot() {
    var tries = 0;
    (function wait() {
      if (init()) return;
      if (++tries < 40) setTimeout(wait, 100);
    })();
  }
  var delay = 1500;
  if (document.readyState === 'complete') setTimeout(boot, delay);
  else window.addEventListener('load', function () { setTimeout(boot, delay); });
})();

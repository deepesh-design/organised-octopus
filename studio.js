/* Studio page motion. Vanilla, transform/opacity only. Starts after the loading screen lifts. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var root, vw, vh, mobile;
  var parallax = [], proc, track, panels = [], bar, countEl;

  function measure() {
    vw = window.innerWidth; vh = window.innerHeight; mobile = vw <= 767;
    if (proc && track) {
      if (mobile) { proc.style.height = ''; }
      else {
        var span = track.scrollWidth - vw;
        proc.style.height = (span + vh) + 'px';
      }
    }
  }

  function frame() {
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
    proc = root.querySelector('.st-proc'); track = root.querySelector('.st-track');
    panels = [].slice.call(root.querySelectorAll('.st-panel'));
    bar = root.querySelector('.st-bar > span'); countEl = root.querySelector('.st-count i b');

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

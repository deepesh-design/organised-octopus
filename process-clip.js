/* Process section: paints a pre-inverted copy of the sticky photo through the text (background-clip:text),
   so the "difference" look works without mix-blend-mode, which iOS Safari drops over sticky layers.
   Each .r-kei-clip element gets the photo as a background, sized and offset to match the photo box on screen. */
(function () {
  var SRC = './assets/process/wip-elephant-planter-inverted.webp';
  var img = new Image();
  var ready = false;
  var queued = false;
  var holdUntil = 0;

  function sync() {
    queued = false;
    var wrap = document.querySelector('.r-kei-img-wrap');
    var els = document.querySelectorAll('.r-kei-clip');
    if (!wrap || !els.length) return;
    var ir = wrap.getBoundingClientRect();
    if (!ir.width) return;
    var url = 'url("' + img.src + '")';
    for (var i = 0; i < els.length; i++) {
      var el = els[i], r = el.getBoundingClientRect();
      el.style.backgroundImage = url + ',linear-gradient(#000,#000)';
      el.style.backgroundSize = ir.width + 'px ' + ir.height + 'px,100% 100%';
      el.style.backgroundPosition = (ir.left - r.left) + 'px ' + (ir.top - r.top) + 'px,0 0';
    }
    // the link text slides on hover; keep following it until the transition ends
    if (performance.now() < holdUntil) request();
  }

  function request() {
    if (!ready || queued) return;
    queued = true;
    requestAnimationFrame(sync);
  }

  function hold() { holdUntil = performance.now() + 650; request(); }

  img.onload = function () { ready = true; request(); };
  img.src = SRC;

  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
  addEventListener('load', request);
  document.addEventListener('mouseover', function (e) { if (e.target.closest && e.target.closest('.r-kei-text')) hold(); });
  document.addEventListener('mouseout', function (e) { if (e.target.closest && e.target.closest('.r-kei-text')) hold(); });
  // the page is rendered by a script after load, so keep nudging until the elements exist
  var tries = 0, t = setInterval(function () {
    request();
    if (++tries > 40 || document.querySelector('.r-kei-clip')) { clearInterval(t); request(); }
  }, 250);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(request);
})();

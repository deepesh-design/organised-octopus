/* Product pages: header, menu, footer reveal, and the image hand-off from the collection page. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var footer = $('footer'), spacer = $('spacer'), menu = $('menu');
  var bars = [$('bar1'), $('bar2'), $('bar3')];
  var links = Array.prototype.slice.call(document.querySelectorAll('.r-menu-link'));

  function onResize() {
    if (footer && spacer) spacer.style.height = footer.offsetHeight + 'px';
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('load', onResize);
  Array.prototype.forEach.call(footer.querySelectorAll('img'), function (img) {
    if (!img.complete) img.addEventListener('load', onResize, { once: true });
  });
  onResize();

  function setMenu(open) {
    var r = open ? 'circle(150% at calc(100% - var(--gx) - 22px) 38px)' : 'circle(0px at calc(100% - var(--gx) - 22px) 38px)';
    menu.style.clipPath = r; menu.style.webkitClipPath = r;
    menu.style.pointerEvents = open ? 'auto' : 'none';
    var c = open ? '#fff' : '#000';
    bars.forEach(function (b) { b.style.background = c; });
    bars[0].style.transform = open ? 'translateY(8px) rotate(45deg)' : 'none';
    bars[2].style.transform = open ? 'translateY(-8px) rotate(-45deg)' : 'none';
    bars[1].style.opacity = open ? '0' : '1';
    bars[1].style.width = open ? '28px' : '20px';
    links.forEach(function (el, i) {
      el.style.transitionDelay = open ? (0.12 + i * 0.07) + 's' : '0s';
      el.style.opacity = open ? '1' : '0';
      el.style.transform = open ? 'translateY(0)' : 'translateY(24px)';
    });
    menu.setAttribute('data-open', open ? '1' : '0');
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-menu-toggle],[data-menu-close]') : null;
    if (!t) return;
    if (t.hasAttribute('data-menu-toggle')) setMenu(menu.getAttribute('data-open') !== '1');
    else setMenu(false);
  });


  // Going back to the collection: skip its loading screen.
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var path = (a.getAttribute('href') || '').split('#')[0].replace(/\/$/, '');
    if (/(^|\/)collection(\.html)?$/.test(path)) {
      try { sessionStorage.setItem('ooSkipLoader', '1'); } catch (err) { /* ignore */ }
    }
  });

  // Image hand-off: the clicked tile's picture glides from where it was to where it lives on this page.
  try {
    var raw = sessionStorage.getItem('ooPiece');
    sessionStorage.removeItem('ooPiece');
    var img = $('piece-img'), info = $('piece-info');
    var flip = (img && img.closest && img.closest('.oo-gallery__view')) || img;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (raw && img && !reduce) {
      var d = JSON.parse(raw);
      if (d && d.slug === img.getAttribute('data-slug') && Date.now() - d.t < 10000) {
        var r = flip.getBoundingClientRect();
        var dx = d.left - r.left, dy = d.top - r.top, s = d.width / r.width;
        img.setAttribute('data-flip', Math.round(dx) + ',' + Math.round(dy) + ',' + s.toFixed(3));
        flip.style.position = 'relative';
        flip.style.zIndex = '30';
        flip.style.transformOrigin = 'top left';
        flip.style.transition = 'none';
        flip.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')';
        if (info) { info.style.opacity = '0'; info.style.transform = 'translateY(24px)'; }
        void flip.offsetWidth; // apply the starting position before animating
        function startFlip() {
          flip.style.transition = 'transform .9s cubic-bezier(.16,1,.3,1)';
          flip.style.transform = 'none';
          if (info) {
            info.style.transition = 'opacity .7s ease .3s, transform .9s cubic-bezier(.16,1,.3,1) .3s';
            info.style.opacity = '1';
            info.style.transform = 'none';
          }
        }
        // double rAF locks the start to the next paint, so the glide never skips or stutters its first frame;
        // a plain timer falls back for background tabs, where rAF is throttled and would delay the start instead
        if (document.hidden) {
          setTimeout(startFlip, 40);
        } else {
          requestAnimationFrame(function () { requestAnimationFrame(startFlip); });
        }
        setTimeout(function () {
          flip.style.transition = ''; flip.style.transform = ''; flip.style.zIndex = ''; flip.style.position = ''; flip.style.transformOrigin = '';
          if (info) { info.style.transition = ''; info.style.opacity = ''; info.style.transform = ''; }
        }, 1600);
      }
    }
  } catch (err) { /* no transition, the page still works */ }
})();

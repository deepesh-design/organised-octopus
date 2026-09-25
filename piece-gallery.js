/* Product gallery: a scroll-snap strip (vertical on desktop, horizontal on mobile) with a black slider that follows and drives it. */
(function () {
  function init(g) {
    var view = g.querySelector('.oo-gallery__view');
    var bar = g.querySelector('.oo-gallery__bar');
    var thumb = g.querySelector('.oo-gallery__thumb');
    if (!view || !bar || !thumb) return;

    function vertical() { return getComputedStyle(view).flexDirection === 'column'; }

    function update() {
      var v = vertical();
      var size = v ? view.clientHeight : view.clientWidth;
      var total = v ? view.scrollHeight : view.scrollWidth;
      var pos = v ? view.scrollTop : view.scrollLeft;
      var track = v ? bar.clientHeight : bar.clientWidth;
      if (!total || !track) return;
      var len = Math.max(24, track * size / total);
      var max = total - size;
      var off = max > 0 ? (pos / max) * (track - len) : 0;
      thumb.style[v ? 'height' : 'width'] = len + 'px';
      thumb.style[v ? 'width' : 'height'] = '';
      thumb.style.transform = v ? 'translateY(' + off + 'px)' : 'translateX(' + off + 'px)';
    }

    function seek(e) {
      var v = vertical();
      var r = bar.getBoundingClientRect();
      var track = v ? r.height : r.width;
      var len = parseFloat(thumb.style[v ? 'height' : 'width']) || 0;
      var p = (v ? e.clientY - r.top : e.clientX - r.left) - len / 2;
      var frac = Math.min(1, Math.max(0, p / Math.max(1, track - len)));
      var max = v ? view.scrollHeight - view.clientHeight : view.scrollWidth - view.clientWidth;
      if (v) view.scrollTop = frac * max; else view.scrollLeft = frac * max;
    }

    var dragging = false;
    bar.addEventListener('pointerdown', function (e) {
      dragging = true;
      view.style.scrollSnapType = 'none';
      try { bar.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      seek(e);
      e.preventDefault();
    });
    bar.addEventListener('pointermove', function (e) { if (dragging) seek(e); });
    function end() {
      if (!dragging) return;
      dragging = false;
      var v = vertical();
      var size = v ? view.clientHeight : view.clientWidth;
      var pos = v ? view.scrollTop : view.scrollLeft;
      var idx = Math.round(pos / size);
      view.style.scrollSnapType = '';
      view.scrollTo(v ? { top: idx * size, behavior: 'smooth' } : { left: idx * size, behavior: 'smooth' });
    }
    bar.addEventListener('pointerup', end);
    bar.addEventListener('pointercancel', end);

    view.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    Array.prototype.forEach.call(view.querySelectorAll('img'), function (img) {
      if (!img.complete) img.addEventListener('load', update, { once: true });
    });
    update();
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-oo-gallery]'), init);
})();

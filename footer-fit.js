/* Keeps the scroll spacer exactly as tall as the fixed footer. The footer's height changes after
   first paint (web font swap wraps a line, logo loads, rotation), which left the page content
   covering the top of the footer when the spacer was measured too early. */
(function () {
  var footer = null, spacer = null, ro = null;

  function find() {
    spacer = document.getElementById('spacer');
    footer = spacer && spacer.nextElementSibling;
    if (footer && getComputedStyle(footer).position !== 'fixed') footer = null;
  }

  function fit() {
    if (!footer || !spacer || !footer.isConnected || !spacer.isConnected) {
      find();
      if (ro) ro.disconnect();
      if (footer && window.ResizeObserver) { ro = new ResizeObserver(fit); ro.observe(footer); }
    }
    if (!footer || !spacer) return;
    var h = footer.offsetHeight + 'px';
    if (spacer.style.height !== h) spacer.style.height = h;
  }

  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  window.addEventListener('scroll', fit, { passive: true });
  document.addEventListener('DOMContentLoaded', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  setTimeout(fit, 100);
  setTimeout(fit, 600);
  setTimeout(fit, 1500);
  fit();
})();

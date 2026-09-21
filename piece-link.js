/* Collection page: clicking a piece keeps its picture where it is, fades everything else out,
   and tells the product page where the picture was so it can glide into place. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest ? e.target.closest('#product-grid a[href*="pieces/"]') : null;
    if (!a) return;
    var tile = a.closest('#product-grid > div');
    var img = tile && tile.querySelector('img');
    if (!img) return;

    e.preventDefault();
    var r = img.getBoundingClientRect();
    var slug = a.getAttribute('href').split('/').pop();
    try {
      sessionStorage.setItem('ooPiece', JSON.stringify({ slug: slug, left: r.left, top: r.top, width: r.width, t: Date.now() }));
    } catch (err) { /* the page still opens, just without the glide */ }

    document.documentElement.classList.add('oo-leaving');
    tile.classList.add('oo-picked');
    setTimeout(function () { window.location.href = a.href; }, reduce ? 0 : 240);
  });

  // Coming back with the browser's back button: undo the fade.
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    document.documentElement.classList.remove('oo-leaving');
    var p = document.querySelector('.oo-picked');
    if (p) p.classList.remove('oo-picked');
  });
})();

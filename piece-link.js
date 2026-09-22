/* Opening a piece from the collection or the home page.
   The clicked picture stays exactly where it is (a ghost copy), everything else fades out, and the
   product page is told where the picture was so it can glide into place. No loading screen in between. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var css = document.createElement('style');
  css.textContent =
    'html.oo-leaving body > *:not(.oo-ghost){opacity:0 !important;transition:opacity .2s ease;}' +
    '.oo-ghost{position:fixed;z-index:9999;margin:0;overflow:hidden;background:#fff;pointer-events:none;}' +
    '.oo-ghost img{display:block;width:100%;height:100%;object-fit:cover;}' +
    '@view-transition{navigation:auto;}' +
    '::view-transition-old(root),::view-transition-new(root){animation-duration:.25s;}';
  document.head.appendChild(css);

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest ? e.target.closest('a[href*="pieces/"]') : null;
    if (!a) return;

    // the picture that belongs to this link: named by data-piece-target, or inside the link / its tile
    var target = a.getAttribute('data-piece-target');
    var img = target ? document.querySelector(target) : null;
    if (!img) {
      var scope = a.closest('[data-piece-tile]') || a.closest('#product-grid > div') || a;
      img = scope.querySelector('[data-piece-image]') || scope.querySelector('img');
    }
    if (!img) return; // nothing to carry over, so follow the link normally
    var r = img.getBoundingClientRect();
    if (!r.width || !r.height) return;

    e.preventDefault();
    var slug = a.getAttribute('href').split('#')[0].split('/').pop();
    try {
      sessionStorage.setItem('ooPiece', JSON.stringify({ slug: slug, left: r.left, top: r.top, width: r.width, t: Date.now() }));
    } catch (err) { /* the page still opens, just without the glide */ }

    var ghost = document.createElement('div');
    ghost.className = 'oo-ghost';
    ghost.style.cssText = 'left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px;';
    var g = new Image();
    g.src = img.currentSrc || img.src;
    g.alt = '';
    ghost.appendChild(g);
    document.body.appendChild(ghost);
    document.documentElement.classList.add('oo-leaving');

    setTimeout(function () { window.location.href = a.href; }, reduce ? 0 : 200);
  });

  // Coming back with the browser's back button: undo the fade.
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    document.documentElement.classList.remove('oo-leaving');
    var gh = document.querySelector('.oo-ghost');
    if (gh) gh.remove();
  });
})();

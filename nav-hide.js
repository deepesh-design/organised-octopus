/* Nav bar slides out of view as the fixed footer is revealed at the bottom of the page,
   and slides back the moment you scroll away from it. Re-queries the elements on every
   call rather than caching them, since the templated pages (index/about/contact) can
   re-render their body after this script first runs. */
(function () {
  var hidden = false;

  function onScroll() {
    var header = document.getElementById('site-header');
    var spacer = document.getElementById('spacer');
    if (!header || !spacer) return;
    if (!header.style.transition) {
      header.style.transition = 'transform .5s cubic-bezier(.65,0,.35,1)';
      header.style.willChange = 'transform';
    }
    var shouldHide = spacer.getBoundingClientRect().top < window.innerHeight;
    if (shouldHide === hidden) return;
    hidden = shouldHide;
    header.style.transform = hidden ? 'translateY(-100%)' : 'translateY(0)';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('load', onScroll);
  document.addEventListener('DOMContentLoaded', onScroll);
  // templated pages can finish rendering slightly after this script runs
  setTimeout(onScroll, 100);
  setTimeout(onScroll, 500);
  setTimeout(onScroll, 1500);
  onScroll();
})();

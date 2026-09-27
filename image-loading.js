/* Handles initial, lazy, and dynamically replaced images without adding wrappers. */
(function () {
  var states = new WeakMap();
  function watch(img) {
    if (img.closest('.oo-ghost') || img.hasAttribute('data-no-image-loading')) return;
    var state = states.get(img);
    if (!state) {
      state = { timer: null, reveal: null };
      states.set(img, state);
      img.addEventListener('load', function () { finish(img, true); });
      img.addEventListener('error', function () { finish(img, false); });
    }
    clearTimeout(state.timer);
    clearTimeout(state.reveal);
    img.classList.remove('oo-image-pending', 'oo-image-reveal');
    if (img.complete || !(img.currentSrc || img.getAttribute('src') || img.getAttribute('srcset'))) return;
    // Cached and fast images should never flash a placeholder.
    state.timer = setTimeout(function () {
      if (img.isConnected && !img.complete) img.classList.add('oo-image-pending');
    }, 120);
  }
  function finish(img, success) {
    var state = states.get(img);
    if (!state) return;
    clearTimeout(state.timer);
    var pending = img.classList.contains('oo-image-pending');
    img.classList.remove('oo-image-pending');
    if (success && pending) {
      img.classList.add('oo-image-reveal');
      state.reveal = setTimeout(function () { img.classList.remove('oo-image-reveal'); }, 400);
    }
  }
  function scan(node) {
    if (node.nodeType !== 1) return;
    if (node.tagName === 'IMG') watch(node);
    node.querySelectorAll('img').forEach(watch);
  }
  scan(document.documentElement);
  new MutationObserver(function (records) {
    records.forEach(function (record) {
      if (record.type === 'childList') record.addedNodes.forEach(scan);
      else if (record.target.tagName === 'IMG') watch(record.target);
      else if (record.target.tagName === 'SOURCE' && record.target.parentElement) scan(record.target.parentElement);
    });
  }).observe(document.documentElement, {
    subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'srcset', 'sizes']
  });
})();

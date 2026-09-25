/* Menu overlay: hovering "Collection" fans a stack of pieces in like a pile of files,
   then flicks through them while the pointer stays on the link. Pointer devices only. */
(function () {
  // Clip each animated line independently so descenders cannot leak after the swap.
  var labelStyle = document.createElement('style');
  labelStyle.textContent = '.r-menu-link .r-hov,.r-menu-ov-link .r-hov{line-height:1.2;}' +
    '.r-menu-link .r-hov-a,.r-menu-link .r-hov-b,.r-menu-ov-link .r-hov-a,.r-menu-ov-link .r-hov-b{height:100%;overflow:hidden;clip-path:inset(0);}' ;
  document.head.appendChild(labelStyle);
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var IMAGES = [
    { src: 'assets/products/md/geometric-deer-head.webp', alt: 'Geometric Deer Head' },
    { src: 'assets/products/md/geometric-dog-side-table.webp', alt: 'Geometric Dog Side Table' },
    { src: 'assets/products/md/lion-head-wall-mount.webp', alt: 'Lion Head Wall Mount' },
    { src: 'assets/products/md/elephant-planter.webp', alt: 'Elephant Wall Planter' }
  ];

  // resting pose for each rank in the pile (0 = top card)
  var POSES = [
    'translate(0px,0px) rotate(-3deg)',
    'translate(30px,-24px) rotate(2deg)',
    'translate(58px,-44px) rotate(6deg)',
    'translate(84px,-62px) rotate(10deg)'
  ];
  var HIDDEN = 'translate(70px,120%) rotate(16deg)';
  var FLICK = 'translate(-72%,6%) rotate(-16deg)';
  var EASE = 'cubic-bezier(.16,1,.3,1)';

  var css = document.createElement('style');
  css.textContent =
    '.oo-stack{position:absolute;z-index:1;top:40%;right:max(9vw,calc((100vw - 1440px)/2 + 130px));width:min(24vw,360px);aspect-ratio:1/1;' +
    'transform:translateY(-50%);pointer-events:none;}' +
    '.oo-stack img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;' +
    'outline:1px solid #000;opacity:0;will-change:transform,opacity;}';
  document.head.appendChild(css);

  var stack = null, cards = [], order = [], timer = null, active = false, entering = null;

  function build(menu) {
    stack = document.createElement('div');
    stack.className = 'oo-stack';
    stack.setAttribute('aria-hidden', 'true');
    cards = IMAGES.map(function (im) {
      var el = new Image();
      el.src = im.src; el.alt = ''; el.decoding = 'async';
      el.style.transform = HIDDEN;
      stack.appendChild(el);
      return el;
    });
    order = cards.map(function (_, i) { return i; });
    menu.appendChild(stack);
  }

  function place(el, rank, delay, dur) {
    el.style.transition = 'transform ' + dur + 's ' + EASE + ' ' + delay + 's, opacity .35s ease ' + delay + 's';
    el.style.zIndex = String(cards.length - rank);
    el.style.transform = POSES[rank];
    el.style.opacity = '1';
  }

  function flick() {
    var top = cards[order[0]];
    top.style.transition = 'transform .45s ' + EASE + ', opacity .3s ease';
    top.style.transform = FLICK;
    setTimeout(function () {
      if (!active) return;
      order.push(order.shift());
      order.forEach(function (ci, rank) {
        var isBack = rank === order.length - 1;
        // the flicked card slides in behind the pile; the rest step up one rank
        place(cards[ci], rank, 0, isBack ? 0.6 : 0.7);
      });
    }, 380);
  }

  function show(menu) {
    if (!stack || !stack.isConnected) build(menu);
    clearTimeout(entering); clearInterval(timer);
    active = true;
    order.forEach(function (ci, rank) { place(cards[ci], rank, 0.06 * rank, 0.85); });
    entering = setTimeout(function () {
      if (!active) return;
      timer = setInterval(flick, 1500);
    }, 1200);
  }

  function hide() {
    if (!active) return;
    active = false;
    clearTimeout(entering); clearInterval(timer);
    order.slice().reverse().forEach(function (ci, i) {
      var el = cards[ci];
      el.style.transition = 'transform .5s ' + EASE + ' ' + (0.03 * i) + 's, opacity .3s ease ' + (0.03 * i) + 's';
      el.style.transform = HIDDEN;
      el.style.opacity = '0';
    });
  }

  function collectionLink(node) {
    var a = node && node.closest ? node.closest('a') : null;
    if (!a || !/\/collection(\.html)?$/.test(a.pathname)) return null;
    var menu = a.closest('.r-menu') || a.closest('[style*="z-index: 35"]');
    return menu ? { a: a, menu: menu } : null;
  }

  document.addEventListener('mouseover', function (e) {
    var hit = collectionLink(e.target);
    if (hit) show(hit.menu);
  });
  document.addEventListener('mouseout', function (e) {
    var hit = collectionLink(e.target);
    if (!hit) return;
    if (e.relatedTarget && hit.a.contains(e.relatedTarget)) return;
    hide();
  });
})();

/* "Inquire" button.
   Any element with data-oo-share="whatsapp" plus data-slug, data-name and data-img.

   On click:
   1. A picture card is built for the piece (photo, name, "Could you share the price?").
   2. The card is copied to the clipboard as an image.
   3. WhatsApp opens and the customer pastes the card and sends it, along with a written
      message that links to the piece's own page.
   If a browser can't copy images, the written message is copied instead.

   Share button. Any element with data-oo-share-open plus data-slug and data-name opens a
   small menu (WhatsApp, Instagram, copy link) for sharing the piece's page with someone else. */
(function () {
  var WHATSAPP = '917013319687';
  var SITE = 'https://organisedoctopus.com';
  var FONT = '"Funnel Sans", Arial, Helvetica, sans-serif';
  var FONT_DISPLAY = '"Funnel Display", Arial, Helvetica, sans-serif';

  if (!WHATSAPP) document.documentElement.classList.add('oo-no-wa');

  var css = document.createElement('style');
  css.textContent =
    '.oo-no-wa [data-oo-share="whatsapp"]{display:none !important;}' +
    '.oo-bar{display:flex;justify-content:space-between;align-items:center;gap:16px;width:100%;height:44px;padding:0 16px;' +
    'border:1px solid #000;border-radius:0;background:#fff;color:#000;font-family:"Funnel Display",Arial,sans-serif;font-size:14px;font-weight:700;' +
    'letter-spacing:0;cursor:pointer;box-sizing:border-box;text-decoration:none;transition:opacity .3s ease;}' +
    '.oo-bar:hover{opacity:.85;}' +
    '@media (max-width:767px){.oo-bar{font-size:16px;}}' +
    '.oo-bar--solid{background:#000;color:#fff;}' +
    '.oo-share-btn{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:44px;height:44px;padding:0;' +
    'border:1px solid #000;border-radius:0;background:#fff;color:#000;cursor:pointer;box-sizing:border-box;transition:opacity .3s ease;}' +
    '.oo-share-btn:hover{opacity:.85;}' +
    '.oo-share-menu{position:fixed;z-index:130;width:244px;max-width:calc(100vw - 32px);padding:6px;background:#fff;border:1px solid #000;box-shadow:0 8px 24px rgba(0,0,0,.12);box-sizing:border-box;display:flex;flex-direction:column;font-family:"Funnel Sans",Arial,Helvetica,sans-serif;}' +
    '.oo-share-menu__title{padding:8px 10px 10px;color:#666;font-size:11px;font-weight:600;line-height:16px;letter-spacing:.08em;text-transform:uppercase;}' +
    '.oo-share-menu button{display:flex;align-items:center;gap:12px;width:100%;min-height:48px;text-align:left;padding:12px 10px;border:0;border-radius:0;background:#fff;color:#000;font-family:"Funnel Sans",Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;line-height:20px;letter-spacing:0;cursor:pointer;}' +
    '.oo-share-menu button svg{width:20px;height:20px;flex:none;}' +
    '.oo-share-menu button[data-act="copy"]{border-top:1px solid #e5e5e5;margin-top:4px;}' +
    '.oo-share-menu button:hover{background:#f2f2f2;}' +
    '.oo-share-menu button:focus-visible{outline:2px solid #000;outline-offset:-2px;background:#f2f2f2;}' +
    '.oo-toast{position:fixed;left:50%;bottom:24px;z-index:120;transform:translate(-50%,16px);opacity:0;pointer-events:none;' +
    'background:#000;color:#fff;font-family:"Funnel Sans",Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;letter-spacing:0;line-height:130%;' +
    'padding:12px 16px;max-width:calc(100vw - 32px);text-align:center;transition:opacity .3s ease,transform .3s ease;}' +
    '.oo-toast.is-on{opacity:1;transform:translate(-50%,0);pointer-events:auto;}' +
    '.oo-toast a{color:#fff;text-decoration:underline;text-underline-offset:3px;margin-left:8px;}' +
    '@media (max-width:767px){.oo-bar{height:44px;}}';
  document.head.appendChild(css);

  function pieceUrl(slug) { return SITE + '/pieces/' + slug; }

  function message(name, slug) {
    return 'Hi Organised Octopus, I’d like to know the price of the ' + name + '. ' + pieceUrl(slug);
  }

  var toastEl = null, toastTimer = null;
  function toast(text, linkUrl, linkLabel) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'oo-toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = text;
    if (linkUrl) {
      var a = document.createElement('a');
      a.href = linkUrl; a.target = '_blank'; a.rel = 'noopener'; a.textContent = linkLabel;
      toastEl.appendChild(a);
    }
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 7000);
  }

  // Product photo on top, name and the question underneath, as a PNG.
  function buildCard(imgUrl, name) {
    var fontReady = (document.fonts && document.fonts.load)
      ? Promise.all([document.fonts.load('700 44px ' + FONT_DISPLAY), document.fonts.load('500 30px ' + FONT), document.fonts.ready]).catch(function () {})
      : Promise.resolve();
    return fontReady.then(function () {
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
          var W = 1000, BAND = 170;
          var c = document.createElement('canvas');
          c.width = W; c.height = W + BAND;
          var g = c.getContext('2d');
          g.fillStyle = '#fff';
          g.fillRect(0, 0, c.width, c.height);
          g.drawImage(img, 0, 0, W, W);
          g.fillStyle = '#000';
          g.font = '700 44px ' + FONT_DISPLAY;
          g.fillText(name, 40, W + 70);
          g.fillStyle = '#000';
          g.font = '500 30px ' + FONT;
          g.fillText('Could you share the price?', 40, W + 120);
          c.toBlob(function (b) { b ? resolve(b) : reject(new Error('no blob')); }, 'image/png');
        };
        img.onerror = reject;
        img.src = imgUrl;
      });
    });
  }

  function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text); return true; }
    } catch (e) { /* fall through */ }
    try {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  }

  function openChat(url) {
    var w = window.open(url, '_blank');
    if (w) { try { w.opener = null; } catch (e) { /* ignore */ } return true; }
    return false; // blocked
  }

  window.ooShare = { buildCard: buildCard, message: message };

  // Inquire (WhatsApp only).
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-oo-share="whatsapp"]') : null;
    if (!el || !WHATSAPP) return;
    e.preventDefault();

    var name = el.getAttribute('data-name');
    var slug = el.getAttribute('data-slug');
    var imgUrl = new URL(el.getAttribute('data-img'), document.baseURI).href;
    var text = message(name, slug);
    var chatUrl = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text);

    function textFallback() {
      if (!openChat(chatUrl)) toast('Your browser blocked the chat.', chatUrl, 'Open WhatsApp');
      else toast('Send the message in the chat.');
    }

    var canCopyImage = window.ClipboardItem && navigator.clipboard && navigator.clipboard.write && window.isSecureContext;
    if (!canCopyImage) { textFallback(); return; }

    toast('Getting the image ready…');
    var item = { 'image/png': buildCard(imgUrl, name) };

    // The image is copied first, while this page still has focus, then the chat opens.
    navigator.clipboard.write([new window.ClipboardItem(item)])
      .then(function () {
        if (openChat(chatUrl)) toast('Image copied. Paste it in the chat and send.');
        else toast('Image copied. Paste it in the chat and send.', chatUrl, 'Open WhatsApp');
      })
      .catch(textFallback);
  });

  // Share menu (WhatsApp / Instagram / copy link) — shares the piece's page, not a price request.
  var menuEl = null;
  function closeMenu() {
    if (!menuEl) return;
    menuEl.remove();
    menuEl = null;
    document.removeEventListener('click', onOutsideClick, true);
    document.removeEventListener('keydown', onKey, true);
    window.removeEventListener('resize', closeMenu);
    window.removeEventListener('scroll', closeMenu, true);
  }
  function onOutsideClick(e) { if (menuEl && !menuEl.contains(e.target)) closeMenu(); }
  function onKey(e) { if (e.key === 'Escape') closeMenu(); }

  function openMenu(btn, name, slug) {
    closeMenu();
    var url = pieceUrl(slug);
    var text = name + ' — ' + url;

    var menu = document.createElement('div');
    menu.className = 'oo-share-menu';
    var iconStart = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">';
    var icons = {
      wa: iconStart + '<path d="M20.5 11.7a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.1Z"/><path d="M8.3 7.3c-.7.5-.9 1.2-.6 2.1.8 2.5 2.8 4.5 5.3 5.3.9.3 1.6.1 2.1-.6l.6-1-2.2-1.1-.9.8c-1.3-.6-2.4-1.7-3-3l.8-.9-1.1-2.2Z"/></svg>',
      ig: iconStart + '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>',
      copy: iconStart + '<path d="m10 13 4-4M8 15l-1 1a3.5 3.5 0 0 1-5-5l4-4a3.5 3.5 0 0 1 5 0M16 9l1-1a3.5 3.5 0 0 1 5 5l-4 4a3.5 3.5 0 0 1-5 0" transform="translate(0 -1)"/></svg>'
    };
    menu.setAttribute('role', 'group');
    menu.setAttribute('aria-label', 'Share this piece');
    menu.innerHTML = '<div class="oo-share-menu__title">Share this piece</div>' +
      '<button type="button" data-act="wa">' + icons.wa + '<span>Share on WhatsApp</span></button>' +
      '<button type="button" data-act="ig">' + icons.ig + '<span>Share on Instagram</span></button>' +
      '<button type="button" data-act="copy">' + icons.copy + '<span>Copy link</span></button>';
    document.body.appendChild(menu);

    var rect = btn.getBoundingClientRect();
    var top = rect.bottom + 8;
    if (top + menu.offsetHeight > window.innerHeight - 16) top = rect.top - menu.offsetHeight - 8;
    top = Math.max(16, top);
    var left = Math.min(rect.right - menu.offsetWidth, window.innerWidth - menu.offsetWidth - 16);
    left = Math.max(16, left);
    menu.style.top = top + 'px';
    menu.style.left = left + 'px';

    menu.addEventListener('click', function (e) {
      var actEl = e.target && e.target.closest ? e.target.closest('[data-act]') : null;
      if (!actEl) return;
      var act = actEl.getAttribute('data-act');
      if (act === 'wa') {
        openChat('https://wa.me/?text=' + encodeURIComponent(text));
      } else if (act === 'ig') {
        copyText(text);
        openChat('https://www.instagram.com/');
        toast('Link copied. Paste it in Instagram.');
      } else if (act === 'copy') {
        var ok = copyText(url);
        toast(ok ? 'Link copied.' : 'Copy this link: ' + url);
      }
      closeMenu();
    });

    menuEl = menu;
    setTimeout(function () {
      document.addEventListener('click', onOutsideClick, true);
      document.addEventListener('keydown', onKey, true);
      window.addEventListener('resize', closeMenu);
      window.addEventListener('scroll', closeMenu, true);
    }, 0);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('[data-oo-share-open]') : null;
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    openMenu(btn, btn.getAttribute('data-name'), btn.getAttribute('data-slug'));
  });
})();

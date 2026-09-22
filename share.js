/* "Ask for price" buttons.
   Any element with data-oo-share="whatsapp" | "instagram" plus data-slug, data-name and data-img.

   On click:
   1. A picture card is built for the piece (photo, name, "Could you share the price?").
   2. The card is copied to the clipboard as an image.
   3. The studio's chat opens and the customer pastes the card and sends it.
   WhatsApp also opens with a written message that links to the piece's own page. For Instagram, whose chat can't be
   pre-filled, that same message is copied alongside the picture, so pasting still gives the studio the product.
   If a browser can't copy images, the written message is copied instead. */
(function () {
  var WHATSAPP = '917013319687';
  var INSTAGRAM_DM = 'https://ig.me/m/organised_octopus';
  var SITE = 'https://organisedoctopus.com';
  var FONT = '"BDOGrotesk", "Bdogrotesk", Arial, Helvetica, sans-serif';

  if (!WHATSAPP) document.documentElement.classList.add('oo-no-wa');

  var css = document.createElement('style');
  css.textContent =
    '.oo-no-wa [data-oo-share="whatsapp"]{display:none !important;}' +
    '.oo-bar{display:flex;justify-content:space-between;align-items:center;gap:16px;width:100%;height:40px;padding:0 16px;' +
    'border:1px solid #000;border-radius:0;background:#fff;color:#000;font-family:inherit;font-size:16px;font-weight:500;' +
    'letter-spacing:-0.03em;cursor:pointer;box-sizing:border-box;text-decoration:none;transition:opacity .3s ease;}' +
    '.oo-bar:hover{opacity:.85;}' +
    '.oo-bar--solid{background:#000;color:#fff;}' +
    '.oo-toast{position:fixed;left:50%;bottom:24px;z-index:120;transform:translate(-50%,16px);opacity:0;pointer-events:none;' +
    'background:#000;color:#fff;font-family:inherit;font-size:16px;font-weight:500;letter-spacing:-0.03em;line-height:130%;' +
    'padding:12px 16px;max-width:calc(100vw - 32px);text-align:center;transition:opacity .3s ease,transform .3s ease;}' +
    '.oo-toast.is-on{opacity:1;transform:translate(-50%,0);pointer-events:auto;}' +
    '.oo-toast a{color:#fff;text-decoration:underline;text-underline-offset:3px;margin-left:8px;}' +
    '@media (max-width:767px){.oo-bar{height:48px;}}';
  document.head.appendChild(css);

  function message(name, slug) {
    return 'Hi Organised Octopus, I’d like to know the price of the ' + name + '. ' + SITE + '/pieces/' + slug;
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
      ? Promise.all([document.fonts.load('500 44px ' + FONT), document.fonts.ready]).catch(function () {})
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
          g.font = '500 44px ' + FONT;
          g.fillText(name, 40, W + 70);
          g.fillStyle = '#8f8f8f';
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

  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-oo-share]') : null;
    if (!el) return;
    e.preventDefault();

    var kind = el.getAttribute('data-oo-share');
    var name = el.getAttribute('data-name');
    var slug = el.getAttribute('data-slug');
    var imgUrl = new URL(el.getAttribute('data-img'), document.baseURI).href;
    var text = message(name, slug);
    if (kind === 'whatsapp' && !WHATSAPP) return;

    var chatUrl = kind === 'whatsapp'
      ? 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text)
      : INSTAGRAM_DM;
    var chatName = kind === 'whatsapp' ? 'WhatsApp' : 'Instagram';

    function textFallback() {
      var copied = kind === 'instagram' ? copyText(text) : true;
      if (!openChat(chatUrl)) toast('Your browser blocked the chat.', chatUrl, 'Open ' + chatName);
      else toast(kind === 'instagram'
        ? (copied ? 'Message copied. Paste it in the chat and send.' : 'Send us this in the chat: ' + text)
        : 'Send the message in the chat.');
    }

    var canCopyImage = window.ClipboardItem && navigator.clipboard && navigator.clipboard.write && window.isSecureContext;
    if (!canCopyImage) { textFallback(); return; }

    toast('Getting the image ready…');
    var item = { 'image/png': buildCard(imgUrl, name) };
    if (kind === 'instagram') item['text/plain'] = new Blob([text], { type: 'text/plain' });

    // The image is copied first, while this page still has focus, then the chat opens.
    navigator.clipboard.write([new window.ClipboardItem(item)])
      .then(function () {
        if (openChat(chatUrl)) toast('Image copied. Paste it in the chat and send.');
        else toast('Image copied. Paste it in the chat and send.', chatUrl, 'Open ' + chatName);
      })
      .catch(textFallback);
  });
})();

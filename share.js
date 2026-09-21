/* "Ask for price" buttons.
   Any element with data-oo-share="whatsapp" | "instagram" plus data-slug, data-name and data-img.

   A picture card is built for the piece (photo, name, "Could you share the price?") and then:
   - WhatsApp:  the card is copied to the clipboard, the chat opens with a written message, and the customer pastes the card.
   - Instagram: Instagram's web chat can't take a pasted picture, so on a computer the card is saved to the downloads
                (and copied) and the chat opens, ready for the customer to attach it with the photo icon.
                On a phone the share sheet opens with the card so it can be sent straight to Instagram.
   If a browser can't do any of this, the written message with the piece's link is used instead. */
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
    '.oo-toast a{color:#fff;text-decoration:underline;text-underline-offset:3px;margin-left:8px;}';
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

  function hideToast() {
    if (toastEl) toastEl.classList.remove('is-on');
    clearTimeout(toastTimer);
  }

  function download(blob, fileName) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = fileName;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 15000);
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
    var fileName = slug + '-price.png';
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

    var canCopyImage = !!(window.ClipboardItem && navigator.clipboard && navigator.clipboard.write && window.isSecureContext);
    var cardPromise = (canCopyImage || kind === 'instagram') ? buildCard(imgUrl, name) : null;

    // ---- Instagram on a phone: share sheet with the card, so it can go straight into a chat ----
    var isTouch = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    var canShareFile = false;
    if (kind === 'instagram' && isTouch && navigator.canShare && typeof File === 'function') {
      try { canShareFile = navigator.canShare({ files: [new File([new Blob()], fileName, { type: 'image/png' })] }); } catch (err) { canShareFile = false; }
    }

    // ---- Instagram on a computer: save the card, copy it, open the chat ----
    function instagramSaveAndOpen(tryClipboard) {
      var copied = false;
      var write = (tryClipboard && canCopyImage)
        ? navigator.clipboard.write([new window.ClipboardItem({ 'image/png': cardPromise })]).then(function () { copied = true; }, function () {})
        : Promise.resolve();
      write.then(function () { return cardPromise; }).then(function (blob) {
        download(blob, fileName);
        var opened = openChat(chatUrl);
        var msg = copied
          ? 'Image saved and copied. Paste it in the chat, or attach it with the photo icon.'
          : 'Image saved to your downloads. Attach it in the chat with the photo icon.';
        if (opened) toast(msg); else toast(msg, chatUrl, 'Open Instagram');
      }).catch(textFallback);
    }

    if (kind === 'instagram') {
      if (canShareFile) {
        toast('Getting the image ready…');
        cardPromise.then(function (blob) {
          var file = new File([blob], fileName, { type: 'image/png' });
          hideToast();
          return navigator.share({ files: [file] });
        }).catch(function (err) {
          if (err && err.name === 'AbortError') return; // customer closed the share sheet
          instagramSaveAndOpen(false);
        });
        return;
      }
      toast('Getting the image ready…');
      instagramSaveAndOpen(true);
      return;
    }

    // ---- WhatsApp: copy the card, open the chat with a written message ----
    if (!canCopyImage) { textFallback(); return; }
    toast('Getting the image ready…');
    // The image is copied first, while this page still has focus, then the chat opens.
    navigator.clipboard.write([new window.ClipboardItem({ 'image/png': cardPromise })])
      .then(function () {
        if (openChat(chatUrl)) toast('Image copied. Paste it in the chat and send.');
        else toast('Image copied. Paste it in the chat and send.', chatUrl, 'Open ' + chatName);
      })
      .catch(textFallback);
  });
})();

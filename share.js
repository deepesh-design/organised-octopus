/* "Ask for price" buttons.
   Any element with data-oo-share="whatsapp" | "instagram" plus data-slug and data-name
   sends a ready-made message that links to the piece's own page, so the studio sees the
   product image in the chat preview and can open the piece.

   To turn WhatsApp on, put the studio number below: country code + number, digits only,
   e.g. '919876543210'. While it is empty the WhatsApp buttons stay hidden. */
(function () {
  var WHATSAPP = '';
  var INSTAGRAM_DM = 'https://ig.me/m/organised_octopus';
  var SITE = 'https://organisedoctopus.com';

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
    '.oo-toast.is-on{opacity:1;transform:translate(-50%,0);}';
  document.head.appendChild(css);

  function message(name, slug) {
    return 'Hi Organised Octopus, I’d like to know the price of the ' + name + '. ' + SITE + '/pieces/' + slug;
  }

  var toastEl = null, toastTimer = null;
  function toast(text) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'oo-toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = text;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 5000);
  }

  function copy(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) { /* fall through */ }
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  }

  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-oo-share]') : null;
    if (!el) return;
    e.preventDefault();

    var kind = el.getAttribute('data-oo-share');
    var text = message(el.getAttribute('data-name'), el.getAttribute('data-slug'));

    if (kind === 'whatsapp') {
      if (!WHATSAPP) return;
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      return;
    }

    // Instagram can't be pre-filled from a link, so copy the message and open the chat.
    var copied = copy(text);
    window.open(INSTAGRAM_DM, '_blank', 'noopener');
    toast(copied ? 'Message copied. Paste it in the chat and send.' : 'Send us this in the chat: ' + text);
  });
})();

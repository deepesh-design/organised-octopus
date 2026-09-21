/* Contact form: sends the message by email through FormSubmit (formsubmit.co).
   The first submission triggers a one-time activation email to the receiving address. */
(function () {
  var TO = 'contact@organisedoctopus.com';
  var ENDPOINT = 'https://formsubmit.co/ajax/' + TO;

  function setStatus(form, html, isError) {
    var el = form.querySelector('#form-status');
    if (!el) return;
    el.innerHTML = html;
    el.style.display = html ? 'block' : 'none';
    el.style.color = isError ? '#b00020' : '#000';
  }

  document.addEventListener('submit', function (e) {
    var form = e.target && e.target.closest ? e.target.closest('#contact-form') : null;
    if (!form) return;
    e.preventDefault();

    var data = new FormData(form);
    if (data.get('_honey')) return; // bot filled the hidden field

    var name = String(data.get('name') || '').trim();
    var email = String(data.get('email') || '').trim();
    var message = String(data.get('message') || '').trim();
    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus(form, 'Please add your name, a valid email and a message.', true);
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    var label = btn.querySelector('.oo-submit-label');
    var original = label.textContent;
    btn.disabled = true;
    label.textContent = 'Sending…';
    setStatus(form, '', false);

    var payload = {
      name: name,
      email: email,
      topic: data.get('topic') || 'Not specified',
      message: message,
      _replyto: email,
      _subject: 'New message from organisedoctopus.com',
      _template: 'table',
      _captcha: 'false'
    };

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (res) {
        if (!res.ok || res.body.success === false || res.body.success === 'false') throw new Error('rejected');
        form.reset();
        setStatus(form, 'Thanks, message sent. We’ll get back to you soon.', false);
      })
      .catch(function () {
        setStatus(form, 'That didn’t go through. You can email us directly at <a href="mailto:' + TO + '" style="color:inherit;text-decoration:underline;">' + TO + '</a>.', true);
      })
      .then(function () {
        btn.disabled = false;
        label.textContent = original;
      });
  });
})();

/* Commodex Pty Ltd — Coming Soon
   Countdown, newsletter form and small niceties. No dependencies. */

(function () {
  'use strict';

  /* ---------------------------------------------------------------- year */

  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ----------------------------------------------------------- countdown */

  var countdown = document.querySelector('[data-countdown]');

  if (countdown) {
    var fields = {
      days: countdown.querySelector('[data-unit="days"]'),
      hours: countdown.querySelector('[data-unit="hours"]'),
      minutes: countdown.querySelector('[data-unit="minutes"]'),
      seconds: countdown.querySelector('[data-unit="seconds"]')
    };

    var launch = Date.parse(countdown.getAttribute('data-launch'));

    // Fall back to 90 days out if the launch date is missing or malformed.
    if (isNaN(launch)) launch = Date.now() + 90 * 864e5;

    var pad = function (n) { return n < 10 ? '0' + n : String(n); };

    var tick = function () {
      var remaining = Math.max(0, launch - Date.now());
      var seconds = Math.floor(remaining / 1000);

      fields.days.textContent = pad(Math.floor(seconds / 86400));
      fields.hours.textContent = pad(Math.floor(seconds / 3600) % 24);
      fields.minutes.textContent = pad(Math.floor(seconds / 60) % 60);
      fields.seconds.textContent = pad(seconds % 60);

      if (remaining === 0) clearInterval(timer);
    };

    tick();
    var timer = setInterval(tick, 1000);
  }

  /* ----------------------------------------------------------- subscribe */

  var form = document.querySelector('[data-subscribe]');

  if (form) {
    var input = form.querySelector('input[type="email"]');
    var button = form.querySelector('button');
    var message = document.querySelector('[data-subscribe-message]');
    var defaultNote = message ? message.textContent : '';

    var say = function (text, state) {
      if (!message) return;
      message.textContent = text;
      message.classList.toggle('is-error', state === 'error');
      message.classList.toggle('is-success', state === 'success');
    };

    var looksLikeEmail = function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    };

    form.addEventListener('input', function () {
      form.classList.remove('is-invalid');
      if (message && message.classList.contains('is-error')) say(defaultNote, null);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var email = input.value.trim();

      if (!looksLikeEmail(email)) {
        form.classList.add('is-invalid');
        say('Please enter a valid email address.', 'error');
        input.focus();
        return;
      }

      var endpoint = form.getAttribute('data-endpoint');

      // No form service configured: hand the address to the visitor's mail
      // client so the signup still reaches us.
      if (!endpoint) {
        var to = form.getAttribute('data-mailto') || 'hello@commodex.com.au';
        var href = 'mailto:' + to +
          '?subject=' + encodeURIComponent('Launch notification request') +
          '&body=' + encodeURIComponent('Please notify me when Commodex launches.\n\nEmail: ' + email);
        window.location.href = href;
        say('Opening your email app to confirm — send the message and you are on the list.', 'success');
        form.reset();
        return;
      }

      button.disabled = true;
      say('Adding you to the list…', null);

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Request failed: ' + response.status);
          form.reset();
          say('Thank you — we will be in touch when we launch.', 'success');
        })
        .catch(function () {
          say('Something went wrong. Please email us directly at ' +
              (form.getAttribute('data-mailto') || 'hello@commodex.com.au') + '.', 'error');
        })
        .then(function () {
          button.disabled = false;
        });
    });
  }
}());

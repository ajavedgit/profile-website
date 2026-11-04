/* ==========================================================================
   Profile website — shared behaviour (vanilla JavaScript, no libraries)
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('mobile-menu');

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) setMenu(false);
    });
  }

  /* ---------- Nav shadow on scroll ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Highlight current page in the nav ---------- */
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav__links a[data-page]').forEach(function (a) {
    if (a.getAttribute('data-page') === page) a.setAttribute('aria-current', 'page');
  });

  /* ---------- Scroll reveal (also triggers skill bars) ---------- */
  var revealEls = document.querySelectorAll('.reveal, .bar');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Count-up numbers ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion || isNaN(target)) { el.textContent = target + suffix; return; }
    var duration = 1400, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Accordions (experience + FAQ) ---------- */
  document.querySelectorAll('[data-accordion]').forEach(function (acc) {
    var single = acc.getAttribute('data-accordion') === 'single';
    var buttons = acc.querySelectorAll('.acc-btn');

    function setItem(btn, open) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(open));
      if (panel) panel.classList.toggle('is-open', open);
    }
    buttons.forEach(function (btn) {
      setItem(btn, btn.getAttribute('aria-expanded') === 'true');
      btn.addEventListener('click', function () {
        var willOpen = btn.getAttribute('aria-expanded') !== 'true';
        if (single && willOpen) buttons.forEach(function (b) { if (b !== btn) setItem(b, false); });
        setItem(btn, willOpen);
      });
    });
  });

  /* ---------- Contact form (front-end only demo) ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var success = document.getElementById('form-success');
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setError(field, msg) {
      var wrap = field.closest('.field');
      wrap.classList.toggle('has-error', !!msg);
      wrap.querySelector('.field__error').textContent = msg || '';
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }
    function validate(field) {
      var v = field.value.trim();
      var msg = '';
      if (field.required && !v) msg = 'This field is required.';
      else if (field.type === 'email' && !emailRe.test(v)) msg = 'Please enter a valid email address.';
      else if (field.name === 'message' && v.length < 10) msg = 'Please write at least 10 characters.';
      setError(field, msg);
      return !msg;
    }

    var fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { validate(f); });
      f.addEventListener('input', function () { if (f.closest('.field').classList.contains('has-error')) validate(f); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, firstBad = null;
      fields.forEach(function (f) {
        if (!validate(f)) { ok = false; if (!firstBad) firstBad = f; }
      });
      if (!ok) { firstBad.focus(); return; }

      /* Demo only: nothing is sent anywhere. When you go live, connect this
         to a form service or backend. */
      form.style.display = 'none';
      success.classList.add('is-visible');
      success.setAttribute('tabindex', '-1');
      success.focus();
    });

    var again = document.getElementById('form-reset');
    if (again) again.addEventListener('click', function () {
      form.reset();
      form.style.display = '';
      success.classList.remove('is-visible');
      fields.forEach(function (f) { setError(f, ''); });
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

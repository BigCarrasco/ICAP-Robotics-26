/* ============================================================
   ICAP Engineering — Main JavaScript
   Handles: Navigation, Scroll Reveal, Mobile Menu, Form UX
   ============================================================ */

'use strict';

/* ────────────────────────────────────────────
   MODULE: Mobile Navigation
──────────────────────────────────────────── */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ────────────────────────────────────────────
   MODULE: Active Nav Link
──────────────────────────────────────────── */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();
    if (linkFile === currentPath || (currentPath === '' && linkFile === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ────────────────────────────────────────────
   MODULE: Scroll Reveal
──────────────────────────────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ────────────────────────────────────────────
   MODULE: Telemetry Strip — Live Clock
──────────────────────────────────────────── */
function initTelemetryClock() {
  const el = document.getElementById('telemetry-time');
  if (!el) return;

  function updateClock() {
    const now = new Date();
    const hh  = String(now.getHours()).padStart(2, '0');
    const mm  = String(now.getMinutes()).padStart(2, '0');
    const ss  = String(now.getSeconds()).padStart(2, '0');
    el.textContent = `${hh}:${mm}:${ss}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ────────────────────────────────────────────
   MODULE: Contact Form
──────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn     = form.querySelector('[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'SENDING...';
    btn.disabled = true;

    // Simulated send — replace with fetch() to your backend/formspree
    setTimeout(() => {
      btn.textContent = 'MESSAGE_SENT ✓';
      btn.style.background = '#1a3a1a';
      btn.style.color = '#6fcf97';

      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    }, 1200);
  });
}

/* ────────────────────────────────────────────
   MODULE: Sticky Navbar Scroll State
──────────────────────────────────────────── */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.style.borderBottomColor =
      window.scrollY > 20
        ? 'rgba(72, 72, 72, 0.25)'
        : 'rgba(72, 72, 72, 0.15)';
  }, { passive: true });
}

/* ────────────────────────────────────────────
   INIT: Run all modules on DOM ready
──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavLink();
  initScrollReveal();
  initTelemetryClock();
  initContactForm();
  initNavbarScroll();
});

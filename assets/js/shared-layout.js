/* ============================================================
   ICAP Engineering — Global Components Loader
   Gestiona Navbar y Footer desde un solo lugar para máxima reutilización.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFooter();
  initPWA();
});

function initNavbar() {
  const navbarContainer = document.querySelector('.navbar');
  if (!navbarContainer) return;

  // 1. Detección Inteligente de Rutas
  // Si estamos en la carpeta /pages/, necesitamos subir un nivel (../)
  const isInFolder = window.location.pathname.includes('/pages/');
  const basePath = isInFolder ? '../' : './';

  // 2. Definición del Contenido (Cámbialo una vez, afecta a todo el sitio)
  const navbarHTML = `
    <div class="navbar__inner">
      <a href="${basePath}index.html" class="navbar__logo" aria-label="ICAP Engineering — Home">
        <img src="${basePath}assets/images/logo/logo-negro.svg" alt="ICAP Engineering Logo" class="navbar__logo-img">
      </a>
      
      <button class="navbar__toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links"
        aria-label="Toggle navigation">
        <span class="navbar__toggle-bar"></span>
        <span class="navbar__toggle-bar"></span>
        <span class="navbar__toggle-bar"></span>
      </button>
      
      <ul class="navbar__links" id="nav-links" role="list">
        <li><a href="${basePath}index.html" class="nav-link">Home</a></li>
        <li><a href="${basePath}pages/services.html" class="nav-link">Services</a></li>
        <li><a href="${basePath}pages/about.html" class="nav-link">About</a></li>
        <li><a href="${basePath}pages/contact.html" class="nav-link">Contact</a></li>
      </ul>
      
      <div class="navbar__actions">
        <div class="lang-selector">
          <button class="lang-btn active" data-lang="en">EN</button>
          <span class="lang-separator">|</span>
          <button class="lang-btn" data-lang="es">ES</button>
        </div>
        <a href="${basePath}pages/contact.html" class="btn btn--primary btn--sm">Get a Quote</a>
      </div>
    </div>
    `;

  navbarContainer.innerHTML = navbarHTML;

  // 3. Reactivar el menú móvil tras la inyección
  setupMobileMenu();
}

/**
 * Identifica si un enlace es la página actual para marcar el estado 'active'
 */
function isCurrentPage(pageName) {
  const path = window.location.pathname;
  if (pageName === 'index.html' && (path.endsWith('/') || path.endsWith('index.html'))) return true;
  return path.includes(pageName);
}

/**
 * Lógica funcional del menú hamburguesa (Mobile)
 */
function setupMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('is-open');
      links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);

      // Bloquear scroll al abrir menú (UX Premium)
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Cerrar al hacer click en un link
    links.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        links.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }
}

/**
 * Lógica del Footer Reutilizable
 */
function initFooter() {
  const footerContainer = document.querySelector('.footer');
  if (!footerContainer) return;

  const isInFolder = window.location.pathname.includes('/pages/');
  const basePath = isInFolder ? '../' : './';
  const year = new Date().getFullYear();

  const footerHTML = `
    <div class="footer__inner">
      <div class="footer__brand">
        <p class="footer__brand-name">ICAP ENGINEERING</p>
        <p class="footer__brand-tagline">Global Automation & Robotics</p>
        <div class="footer__social" style="margin-top: var(--space-6); display: flex; gap: var(--space-4);">
          <a href="https://www.linkedin.com/company/icap-company/" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="LinkedIn">
            <svg style="width:20px; height:20px; fill:currentColor;" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
      </div>

      <div class="footer__col">
        <p class="footer__col-title">USA Headquarters</p>
        <div class="footer__contact-item">
          <span class="material-symbols-outlined" aria-hidden="true">location_on</span>
          <span class="footer__link">Miami, Florida (Bayshore)</span>
        </div>
        <div class="footer__contact-item">
          <span class="material-symbols-outlined" aria-hidden="true">phone</span>
          <a href="tel:+14236339146" class="footer__link">+1 (423) 633 91 46</a>
        </div>
      </div>

      <div class="footer__col">
        <p class="footer__col-title">Mexico Branch</p>
        <div class="footer__contact-item">
          <span class="material-symbols-outlined" aria-hidden="true">location_on</span>
          <span class="footer__link">Colima, Mexico</span>
        </div>
        <div class="footer__contact-item">
          <span class="material-symbols-outlined" aria-hidden="true">phone</span>
          <a href="tel:+523141026047" class="footer__link">+52 (314) 102 60 47</a>
        </div>
      </div>

      <div class="footer__col">
        <p class="footer__col-title">Opening Hours</p>
        <div class="footer__contact-item">
          <span class="material-symbols-outlined" aria-hidden="true">schedule</span>
          <span class="footer__link">Mon — Fri: 8:00 - 16:00</span>
        </div>
        <div class="footer__contact-item">
          <span class="material-symbols-outlined" aria-hidden="true">mail</span>
          <a href="mailto:info@icap-ingenieria.com" class="footer__link">info@icap-ingenieria.com</a>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__copyright">
        &copy; <span>${year}</span> ICAP Engineering — All rights reserved.
      </p>
      <div class="footer__badges" aria-label="Certifications">
        <span class="material-symbols-outlined" title="ISO Compliant">verified_user</span>
        <span class="material-symbols-outlined" title="Global Operations">language</span>
        <span class="material-symbols-outlined" title="Industrial Security">shield</span>
      </div>
    </div>
    `;

  footerContainer.innerHTML = footerHTML;
}

/**
 * Lógica PWA: Registro de Service Worker para soporte Offline
 */
function initPWA() {
  // 1. Registrar Service Worker para habilitar el modo PWA Offline
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // El SW debe estar en la raíz para tener alcance en todo el sitio
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('PWA SW no registrado localmente, requiere HTTPS/servidor: ', err);
      });
    });
  }
}

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

  // 1. Detección Inteligente de Rutas y Lenguaje
  const path = window.location.pathname;
  
  // Dividimos el path en segmentos para una detección más precisa
  const segments = path.split('/').filter(s => s !== '');
  const isSpanish = segments.includes('es');
  const isInPages = segments.includes('pages');

  // basePath: Distancia necesaria para llegar a la raíz del proyecto
  let basePath = './';
  if (isSpanish && isInPages) {
    basePath = '../../';
  } else if (isSpanish || isInPages) {
    basePath = '../';
  }

  // 2. Traducciones del Menú
  const translations = {
    en: {
      home: "Home",
      services: "Services",
      about: "About",
      contact: "Contact",
      quote: "Get a Quote"
    },
    es: {
      home: "Inicio",
      services: "Servicios",
      about: "Nosotros",
      contact: "Contacto",
      quote: "Presupuesto"
    }
  };

  const t = isSpanish ? translations.es : translations.en;
  const langPath = isSpanish ? 'es/' : '';
  
  // Helper para generar links que respeten el idioma actual
  const getLink = (targetFile) => {
    return `${basePath}${langPath}${targetFile}`;
  };

  const navbarHTML = `
    <div class="navbar__inner">
      <a href="${getLink('index.html')}" class="navbar__logo" aria-label="ICAP Engineering">
        <img src="${basePath}assets/images/logo/logo-negro.svg" alt="ICAP Engineering Logo" class="navbar__logo-img">
      </a>
      
      <button class="navbar__toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links"
        aria-label="Toggle navigation">
        <span class="navbar__toggle-bar"></span>
        <span class="navbar__toggle-bar"></span>
        <span class="navbar__toggle-bar"></span>
      </button>
      
      <ul class="navbar__links" id="nav-links" role="list">
        <li><a href="${getLink('index.html')}" class="nav-link ${isCurrentPage('index.html') ? 'active' : ''}">${t.home}</a></li>
        <li><a href="${getLink('pages/services.html')}" class="nav-link ${isCurrentPage('services.html') ? 'active' : ''}">${t.services}</a></li>
        <li><a href="${getLink('pages/about.html')}" class="nav-link ${isCurrentPage('about.html') ? 'active' : ''}">${t.about}</a></li>
        <li><a href="${getLink('pages/contact.html')}" class="nav-link ${isCurrentPage('contact.html') ? 'active' : ''}">${t.contact}</a></li>
      </ul>
      
      <div class="navbar__actions">
        <div class="lang-selector">
          <button class="lang-btn ${!isSpanish ? 'active' : ''}" data-lang="en">EN</button>
          <span class="lang-separator">|</span>
          <button class="lang-btn ${isSpanish ? 'active' : ''}" data-lang="es">ES</button>
        </div>
        <a href="${getLink('pages/contact.html')}" class="btn btn--primary btn--sm">${t.quote}</a>
      </div>
    </div>
    `;

  navbarContainer.innerHTML = navbarHTML;

  // 3. Lógica del Selector de Idioma (Redirección entre EN <-> ES)
  setupLanguageSwitcher(isSpanish, basePath);
  
  setupMobileMenu();
}

function setupLanguageSwitcher(isSpanish, basePath) {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.dataset.lang;
      const currentPath = window.location.pathname;

      // Caso 1: Cambiar de Inglés a Español
      if (targetLang === 'es' && !isSpanish) {
        const fileName = currentPath.split('/').pop() || 'index.html';
        const isInPages = currentPath.includes('/pages/');
        const target = isInPages ? `es/pages/${fileName}` : `es/${fileName}`;
        window.location.href = basePath + target;
      } 
      // Caso 2: Cambiar de Español a Inglés
      else if (targetLang === 'en' && isSpanish) {
        // Simplemente quitamos "/es/" de la ruta de forma segura
        let target = currentPath.replace('/es/', '/');
        // Si el resultado es una ruta duplicada como "//" la corregimos
        target = target.replace(/\/+/g, '/');
        window.location.href = target;
      }
    });
  });
}

function isCurrentPage(pageName) {
  const path = window.location.pathname;
  if (pageName === 'index.html' && (path.endsWith('/') || path.endsWith('index.html'))) return true;
  return path.includes(pageName);
}

function setupMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('is-open');
      links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }
}

function initFooter() {
  const footerContainer = document.querySelector('.footer');
  if (!footerContainer) return;

  const path = window.location.pathname;
  const segments = path.split('/').filter(s => s !== '');
  const isSpanish = segments.includes('es');
  
  const year = new Date().getFullYear();
  const translations = {
    en: {
      tagline: "Global Automation & Robotics",
      hq: "USA Headquarters",
      branch: "Mexico Branch",
      hours: "Opening Hours",
      monFri: "Mon — Fri",
      rights: "All rights reserved."
    },
    es: {
      tagline: "Automatización y Robótica Global",
      hq: "Sede USA",
      branch: "Sucursal México",
      hours: "Horario de Atención",
      monFri: "Lun — Vie",
      rights: "Todos los derechos reservados."
    }
  };

  const t = isSpanish ? translations.es : translations.en;

  const footerHTML = `
    <div class="footer__inner">
      <div class="footer__brand">
        <p class="footer__brand-name">ICAP ENGINEERING</p>
        <p class="footer__brand-tagline">${t.tagline}</p>
        <div class="footer__social" style="margin-top: var(--space-6); display: flex; gap: var(--space-4);">
          <a href="https://www.linkedin.com/company/icap-company/" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="LinkedIn">
            <svg style="width:20px; height:20px; fill:currentColor;" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
      </div>

      <div class="footer__col">
        <p class="footer__col-title">${t.hq}</p>
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
        <p class="footer__col-title">${t.branch}</p>
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
        <p class="footer__col-title">${t.hours}</p>
        <div class="footer__contact-item">
          <span class="material-symbols-outlined" aria-hidden="true">schedule</span>
          <span class="footer__link">${t.monFri}: 8:00 - 16:00</span>
        </div>
        <div class="footer__contact-item">
          <span class="material-symbols-outlined" aria-hidden="true">mail</span>
          <a href="mailto:info@icap-ingenieria.com" class="footer__link">info@icap-ingenieria.com</a>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__copyright">
        &copy; <span>${year}</span> ICAP Engineering — ${t.rights}
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

function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('PWA SW no registrado localmente: ', err);
      });
    });
  }
}

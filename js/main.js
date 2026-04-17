/* =====================================================
   CAKE ART BY VERÓNICA MONTALVO — JAVASCRIPT
   ===================================================== */

'use strict';

/* ---------- Navbar: scroll effect ---------- */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

/* ---------- Active nav link highlight ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });

/* ---------- Mobile hamburger menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  hamburger.classList.add('active');
  navLinksContainer.classList.add('open');
  navOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('active');
  navLinksContainer.classList.remove('open');
  navOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (hamburger.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
});

navOverlay.addEventListener('click', closeMenu);

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-link, .btn-nav-cta').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ---------- Smooth scrolling for all anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

/* ---------- Scroll animations (Intersection Observer) ---------- */
const animateElements = document.querySelectorAll('[data-animate]');

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => {
        el.classList.add('animated');
      }, delay);
      animationObserver.unobserve(el);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

animateElements.forEach(el => animationObserver.observe(el));

/* ---------- Counter animation ---------- */
const statNumbers = document.querySelectorAll('.stat-number[data-target]');

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('es');
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

/* ---------- Contact Form → WhatsApp ---------- */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validación de campos requeridos
    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      field.style.borderColor = '';
      field.style.boxShadow = '';
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#E8247C';
        field.style.boxShadow = '0 0 0 4px rgba(232,36,124,0.12)';
      }
    });

    if (!isValid) {
      const firstInvalid = contactForm.querySelector('[style*="E8247C"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Leer valores del formulario
    const nombre  = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const evento  = document.getElementById('evento').value.trim();
    const fecha   = document.getElementById('fecha').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Construir mensaje pre-armado para WhatsApp
    let waText = `Hola Cake Art! 🎂\nMi nombre es ${nombre}.\nQuiero cotizar una torta para: ${evento}\nFecha del evento: ${fecha}\nMi número: ${telefono}`;
    if (mensaje) waText += `\nDetalles: ${mensaje}`;

    const waUrl = `https://wa.me/593998142108?text=${encodeURIComponent(waText)}`;

    // Mostrar confirmación visual
    contactForm.style.display = 'none';
    formSuccess.classList.add('show');

    // Abrir WhatsApp en nueva pestaña
    window.open(waUrl, '_blank');
  });

  // Limpiar estilos de error al escribir
  contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', function () {
      this.style.borderColor = '';
      this.style.boxShadow = '';
    });
  });
}

/* ---------- Gallery hover effect: cursor pointer check ---------- */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', function () {
    const img = this.querySelector('img');
    const label = this.querySelector('.gallery-overlay span');
    if (img && label) {
      // Could open a lightbox here — for now just a subtle visual feedback
      this.style.outline = `3px solid var(--rosa-fucsia)`;
      setTimeout(() => { this.style.outline = ''; }, 400);
    }
  });
});

/* ---------- Specialty cards: stagger animation on load ---------- */
function staggerCards() {
  const cards = document.querySelectorAll('.esp-card');
  cards.forEach((card, i) => {
    if (!card.dataset.delay) {
      card.dataset.delay = i * 80;
    }
  });
}
staggerCards();

/* ---------- Flavor tags: random hover highlight ---------- */
const saborTags = document.querySelectorAll('.sabores-tags span:not(.tag-more)');
if (saborTags.length > 0) {
  function highlightRandomTag() {
    saborTags.forEach(t => t.classList.remove('tag-highlight'));
    const random = saborTags[Math.floor(Math.random() * saborTags.length)];
    random.style.background = 'var(--rosa-fucsia)';
    random.style.borderColor = 'var(--rosa-fucsia)';
    random.style.color = '#fff';
    setTimeout(() => {
      random.style.background = '';
      random.style.borderColor = '';
      random.style.color = '';
    }, 800);
  }
  setInterval(highlightRandomTag, 1800);
}

/* ---------- Set min date for event date input ---------- */
const fechaInput = document.getElementById('fecha');
if (fechaInput) {
  const today = new Date();
  today.setDate(today.getDate() + 3); // Min 3 days advance
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  fechaInput.min = `${yyyy}-${mm}-${dd}`;
}

/* ---------- Back to top on logo click ---------- */
document.querySelectorAll('.nav-logo, .footer-logo').forEach(logo => {
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ---------- Preloader (optional: removes on load) ---------- */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

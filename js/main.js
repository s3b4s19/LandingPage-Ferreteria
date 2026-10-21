/**
 * Ferretería Central — Lógica interactiva
 * Vanilla JS (ES6+). Responsabilidad única por módulo.
 * Módulos: menú móvil accesible · carrusel animado · filtrado de catálogo.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initPromoCarousel();
  initCatalogFilters();
});

/**
 * 1. Menú sticky / desplegable elegante en móvil
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.js-nav-toggle');
  const navMenu = document.querySelector('.js-nav-menu');
  const navLinks = document.querySelectorAll('.js-nav-link');

  if (!toggleBtn || !navMenu) return;

  const setNavigation = (isOpen) => {
    navMenu.classList.toggle('nav--open', isOpen);
    toggleBtn.classList.toggle('header__toggle--active', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute(
      'aria-label',
      isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
    );
  };

  const isOpen = () => navMenu.classList.contains('nav--open');

  toggleBtn.addEventListener('click', () => setNavigation(!isOpen()));

  // Cerrar al pulsar un enlace del menú
  navLinks.forEach((link) => {
    link.addEventListener('click', () => setNavigation(false));
  });

  // Cerrar al hacer clic fuera del menú
  document.addEventListener('click', (event) => {
    if (isOpen() && !navMenu.contains(event.target) && !toggleBtn.contains(event.target)) {
      setNavigation(false);
    }
  });

  // Cerrar con la tecla Escape devolviendo el foco al botón
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setNavigation(false);
      toggleBtn.focus();
    }
  });
}

/**
 * 2. Carrusel visual con animación suave entre banners
 */
function initPromoCarousel() {
  const carousel = document.querySelector('.carousel');
  const track = document.querySelector('.js-carousel-track');
  const slides = document.querySelectorAll('.js-carousel-slide');
  const prevBtn = document.querySelector('.js-carousel-prev');
  const nextBtn = document.querySelector('.js-carousel-next');
  const dots = document.querySelectorAll('.js-carousel-dot');

  if (!carousel || !track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  const render = (newIndex) => {
    // Navegación circular
    currentIndex = (newIndex + totalSlides) % totalSlides;

    // Desplazamiento suave del riel (acelerado por GPU)
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Sincronizar indicadores y accesibilidad de las diapositivas
    slides.forEach((slide, index) => {
      const isCurrent = index === currentIndex;
      slide.setAttribute('aria-hidden', String(!isCurrent));
    });

    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle('carousel__dot--active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
      if (isActive) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });
  };

  prevBtn?.addEventListener('click', () => render(currentIndex - 1));
  nextBtn?.addEventListener('click', () => render(currentIndex + 1));

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetIndex = Number.parseInt(dot.dataset.index ?? '0', 10);
      render(Number.isNaN(targetIndex) ? 0 : targetIndex);
    });
  });

  // Navegación con teclado mediante flechas
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      render(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      render(currentIndex + 1);
    }
  });

  // Soporte táctil (swipe) para móviles
  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 50;

  carousel.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  carousel.addEventListener(
    'touchend',
    (event) => {
      touchEndX = event.changedTouches[0].screenX;
      const delta = touchEndX - touchStartX;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      render(delta < 0 ? currentIndex + 1 : currentIndex - 1);
    },
    { passive: true }
  );

  render(0);
}

/**
 * 3. Catálogo: filtrado por categoría sin recargar la página
 */
function initCatalogFilters() {
  const filterButtons = document.querySelectorAll('.js-filter-btn');
  const productCards = document.querySelectorAll('.js-product-card');

  if (filterButtons.length === 0 || productCards.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter ?? 'all';

      filterButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle('catalog__filter-btn--active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });

      productCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = filterValue === 'all' || category === filterValue;
        card.classList.toggle('product-card--hidden', !shouldShow);
      });
    });
  });
}

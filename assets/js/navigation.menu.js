// assets/js/navigation.menu.js

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  if (!nav || !hamburger || !menu) return;

  // -----------------------------
  // 1. Hamburger-Menü
  // -----------------------------
const toggleMenu = (e) => {
  if (e) {
    e.preventDefault();
    //e.stopPropagation();
  }

  // NEU: Navigation sofort sichtbar machen
  nav.classList.add('nav-visible');

  // Menü öffnen/schliessen
  menu.classList.toggle('active');
};


  hamburger.addEventListener('click', toggleMenu);

  // Menü schliessen, wenn ein Link geklickt wird
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });

  // Menü schliessen, wenn ausserhalb geklickt wird
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove('active');
    }
  });

  // -----------------------------
  // 2. Nav erst bei Interaktion einblenden (Mobile)
  // -----------------------------
  const isMobile = () => window.innerWidth <= 1124;

  const showNavOnce = () => {
    nav.classList.add('nav-visible');
    removeInteractionListeners();
  };

  const addInteractionListeners = () => {
    document.addEventListener('touchstart', showNavOnce, { passive: true });
    document.addEventListener('click', showNavOnce);
    window.addEventListener('scroll', showNavOnce);
  };

  const removeInteractionListeners = () => {
    document.removeEventListener('touchstart', showNavOnce);
    document.removeEventListener('click', showNavOnce);
    window.removeEventListener('scroll', showNavOnce);
  };

  const applyMode = () => {
    if (isMobile()) {
      // Mobile: erst nach Interaktion anzeigen
      nav.classList.remove('nav-visible');
      addInteractionListeners();
    } else {
      // Desktop: immer sichtbar
      nav.classList.add('nav-visible');
      removeInteractionListeners();
    }
  };

  applyMode();
  window.addEventListener('resize', applyMode);
});

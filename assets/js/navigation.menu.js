// assets/js/navigation.menu.js

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  if (!nav || !hamburger || !menu) return;

  // -----------------------------
  // Helpers
  // -----------------------------
  const isMobile = () => window.innerWidth <= 1124;

  const closeAllDropdowns = () => {
    menu.querySelectorAll('.open').forEach(li => li.classList.remove('open'));
  };

  // Findet die direkte Unterliste (egal ob du ul oder .dropdown-content nutzt)
  const getDirectSubmenu = (li) => {
    return (
      li.querySelector(':scope > ul') ||
      li.querySelector(':scope > .dropdown-content')
    );
  };

  // -----------------------------
  // 1. Hamburger-Menü
  // -----------------------------
  const toggleMenu = (e) => {
    if (e) {
      e.preventDefault();
    }

    // Navigation sofort sichtbar machen
    nav.classList.add('nav-visible');

    // Menü öffnen/schliessen
    menu.classList.toggle('active');

    // Wenn Menü geschlossen wird, auch Dropdowns schliessen
    if (!menu.classList.contains('active')) {
      closeAllDropdowns();
    }
  };

  hamburger.addEventListener('click', toggleMenu);

  // -----------------------------
  // 2. Dropdown Verhalten (Mobile)
  //    - Parent mit Unterpunkten: nur öffnen/schliessen, NICHT navigieren
  // -----------------------------
  const bindMobileDropdownToggles = () => {
    // Wir binden auf alle direkten Links im Menü
    menu.querySelectorAll('li > a').forEach(a => {
      const li = a.parentElement;
      if (!li) return;

      const submenu = getDirectSubmenu(li);
      const hasSubmenu = !!submenu;

      a.addEventListener('click', (e) => {
        // Desktop: normales Verhalten (Hover/CSS oder Klick wie bisher)
        if (!isMobile()) return;

        // Wenn kein Submenu: normales Link-Verhalten -> Menü schliessen
        if (!hasSubmenu) {
          menu.classList.remove('active');
          closeAllDropdowns();
          return;
        }

        // Hat Submenu: NICHT navigieren, sondern toggeln
        e.preventDefault();
        e.stopPropagation();

        // Optional: nur ein Dropdown gleichzeitig offen
        menu.querySelectorAll('li.open').forEach(openLi => {
          if (openLi !== li) openLi.classList.remove('open');
        });

        li.classList.toggle('open');
      });
    });
  };

  bindMobileDropdownToggles();

  // -----------------------------
  // 3. Menü schliessen, wenn ausserhalb geklickt wird
  // -----------------------------
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove('active');
      closeAllDropdowns();
    }
  });

  // -----------------------------
  // 4. Nav erst bei Interaktion einblenden (Mobile)
  // -----------------------------
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
      nav.classList.remove('nav-visible');
      addInteractionListeners();
    } else {
      nav.classList.add('nav-visible');
      removeInteractionListeners();

      // Desktop: Dropdown-Status aufräumen
      closeAllDropdowns();
      menu.classList.remove('active');
    }
  };

  applyMode();
  window.addEventListener('resize', applyMode);
});

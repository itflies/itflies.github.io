document.addEventListener("DOMContentLoaded", function () {
  const footerText = document.getElementById("footer-text");
  const footerDynamic = document.getElementById("footer-dynamic");
  let scrollTimeout;
  let initialTimeout;

  // Copyright immer setzen
  if (footerText) {
    const year = new Date().getFullYear();
    footerText.textContent = `© ${year} itFlies GmbH. Alle Rechte vorbehalten.`;
  }

  if (!footerDynamic) return;

  // Hilfsfunktionen für Sichtbarkeit und Klickbarkeit
  function showFooter() {
    footerDynamic.style.opacity = "1";
    footerDynamic.style.pointerEvents = "auto"; // Klicks erlauben, wenn sichtbar
  }

  function hideFooter() {
    footerDynamic.style.opacity = "0";
    footerDynamic.style.pointerEvents = "none"; // Klicks "durchlassen", wenn unsichtbar
  }

  // Dynamischer Teil beim Start ausblenden
  hideFooter();

  // Nach 6 Sekunden einblenden
  initialTimeout = setTimeout(() => {
    showFooter();
  }, 6000);

  // Beim Scrollen ausblenden, nach 5s wieder anzeigen
  window.addEventListener("scroll", function () {
    hideFooter();

    clearTimeout(scrollTimeout);
    clearTimeout(initialTimeout);

    scrollTimeout = setTimeout(() => {
      showFooter();
    }, 5000);
  });
});
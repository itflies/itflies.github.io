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

  // Dynamischer Teil beim Start ausblenden
  footerDynamic.style.opacity = "0";

  // Nach 6 Sekunden einblenden
  initialTimeout = setTimeout(() => {
    footerDynamic.style.opacity = "1";
  }, 6000);

  // Beim Scrollen ausblenden, nach 5s wieder anzeigen
  window.addEventListener("scroll", function () {
    footerDynamic.style.opacity = "0";

    clearTimeout(scrollTimeout);
    clearTimeout(initialTimeout);

    scrollTimeout = setTimeout(() => {
      footerDynamic.style.opacity = "1";
    }, 5000);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const footer = document.getElementById("dynamic-footer");
  const footerText = document.getElementById("footer-text");
  let scrollTimeout;
  let initialTimeout;

  // Dynamischen Footer-Text setzen
  if (footerText) {
    const year = new Date().getFullYear();
    footerText.textContent = `© ${year} itFlies GmbH. Alle Rechte vorbehalten.`;
  }

  if (!footer) return;

  // Footer beim Start ausblenden
  footer.style.opacity = "0";

  // Footer z.B. nach 4 Sekunden das erste Mal einblenden
  initialTimeout = setTimeout(() => {
    footer.style.opacity = "1";
  }, 6000);

  // Footer beim Scrollen ausblenden, nach 5s wieder einblenden
  window.addEventListener("scroll", function () {
    footer.style.opacity = "0";

    // laufenden Timer abbrechen (Start- oder Scroll-Timer)
    clearTimeout(scrollTimeout);
    clearTimeout(initialTimeout);

    scrollTimeout = setTimeout(() => {
      footer.style.opacity = "1";
    }, 5000);
  });
});

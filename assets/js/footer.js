  document.addEventListener("DOMContentLoaded", function () {
    const footer = document.getElementById("dynamic-footer");
    const footerText = document.getElementById("footer-text");
    let scrollTimeout;

    // Dynamischen Footer-Text setzen
    if (footerText) {
      const year = new Date().getFullYear();
      footerText.textContent = `© ${year} itFlies GmbH. Alle Rechte vorbehalten.`;
    }

    // Footer beim Scrollen ausblenden, nach 5s wieder einblenden
    if (footer) {
      window.addEventListener("scroll", function () {
        footer.style.opacity = "0";
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          footer.style.opacity = "1";
        }, 5000);
      });
    }
  });
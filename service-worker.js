const CACHE_NAME = "site-cache-v6"; // Versionsnummer erhöhen bei Updates (z.B. neue Bilder)

const ASSETS = [
  "/", // Startseite
  "/index.html",
  "/manifest.json",
  "/robots.txt",
  "/sitemap.xml",

  // CSS-Dateien
  "/assets/css/all.css",
  "/assets/css/all.min.css",
  "/assets/css/fontawesome.css",
  "/assets/css/fontawesome.min.css",
  "/assets/css/main.css",
  "/assets/css/mobile.css",

  // JavaScript-Dateien
  "/assets/js/all.js",
  "/assets/js/all.min.js",
  "/assets/js/brands.js",
  "/assets/js/brands.min.js",
  "/assets/js/conflict-detection.js",
  "/assets/js/contactmail.js",

  // Schriftarten (Fonts)
  "/assets/fonts/FontAwesome.otf",
  "/assets/fonts/fontawesome-webfont.eot",
  "/assets/fonts/fontawesome-webfont.svg",
  "/assets/fonts/fontawesome-webfont.ttf",
  "/assets/fonts/fontawesome-webfont.woff",
  "/assets/fonts/fontawesome-webfont.woff2",
  "/assets/fonts/open-sans-v40-latin-300.woff2",
  "/assets/fonts/open-sans-v40-latin-500.woff2",
  "/assets/fonts/open-sans-v40-latin-600.woff2",
  "/assets/fonts/open-sans-v40-latin-700.woff2",
  "/assets/fonts/open-sans-v40-latin-800.woff2",
  "/assets/fonts/open-sans-v40-latin-regular.woff2",

  // Bilder
  "/images/android-icon-144x144.png",
  "/images/android-icon-192x192.png",
  "/images/android-icon-36x36.png",
  "/images/android-icon-48x48.png",
  "/images/android-icon-72x72.png",
  "/images/android-icon-96x96.png",
  "/images/apple-icon.png",
  "/images/apple-icon-114x114.png",
  "/images/apple-icon-144x144.png",
  "/images/apple-icon-57x57.png",
  "/images/apple-icon-60x60.png",
  "/images/apple-icon-72x72.png",
  "/images/apple-icon-76x76.png",
  "/images/favicon-16x16.png",
  "/images/favicon-32x32.png",
  "/images/favicon-96x96.png",
  "/images/home.avif",
  "/images/home.png",
  "/images/logo_itflies_50px.png",
  "/images/ms-icon-144x144.png",
  "/images/ms-icon-150x150.png",
  "/images/ms-icon-310x310.png",
  "/images/ms-icon-70x70.png",
  "/images/pic00.png",
  "/images/about/knp.jpg",
  "/images/about/knp.png",
  "/images/about/kom.jpg",
  "/images/about/kom.png",
  "/images/about/LI-Bug.svg.original.svg",
  "/images/about/linkedin.svg",
  "/images/about/logo_itflies_50px.png",
  "/images/partner/logo_data_unit.png",
  "/images/partner/logo_mtf.png",
  "/images/references/logo_bardini.png",
  "/images/references/logo_diahem.png",
  "/images/references/logo_emmenegger.png",
  "/images/references/logo_hedin.png",
  "/images/references/logo_jungheinrich.png",
  "/images/references/logo_kalt.png",
  "/images/references/logo_otto_rohrunterhalt.png",
  "/images/references/logo_ruedersaege.png",
  "/images/screenshots/desktop.png",
  "/images/screenshots/mobile.png",
  "/images/signature/In-Blue-14.png",
  "/images/signature/logo_itflies_50px.png",
  "/images/youtube/video-thumbnail-cad-angebots-kalkulator.jpg"
];

// Service Worker installieren und Assets cachen
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker installiert. Caching folgender Assets:");
      console.log(ASSETS);

      return Promise.all(
        ASSETS.map((url) => {
          return fetch(url, { cache: "no-store" }) // Prüfen, ob die Datei existiert
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Fehler beim Abrufen von ${url}: ${response.statusText}`);
              }
              return cache.put(url, response);
            })
            .catch((error) => console.warn(`Nicht gecacht: ${url} - ${error.message}`));
        })
      );
    })
  );
});

// Fetch-Event: Inhalte aus dem Cache abrufen oder aus dem Netzwerk laden
self.addEventListener("fetch", (event) => {
  if (!event.request.url.startsWith(self.location.origin)) {
    return; // Ignoriere alle externen Anfragen (z. B. Chrome-Erweiterungen)
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(error => console.error("Fetch-Fehler:", error))
  );
});


// Alte Caches bei Aktivierung des neuen Service Workers löschen
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Lösche alten Cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fehlerprotokollierung für Debugging
self.addEventListener("error", (event) => {
  console.error("Service Worker Fehler:", event);
});

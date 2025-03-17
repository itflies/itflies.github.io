const CACHE_NAME = "site-cache-v2"; // Versionsnummer erhöhen bei Updates (z.B. neue Bilder)

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
  "/images/home.png",
  "/images/about/knp.jpg",
  "/images/logo.png"
];

// Service Worker installieren und Assets cachen
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker installiert. Caching folgender Assets:");
      console.log(ASSETS);
      return cache.addAll(ASSETS);
    }).catch(error => console.error("Cache-Fehler:", error))
  );
});

// Fetch-Event: Inhalte aus dem Cache abrufen oder aus dem Netzwerk laden
self.addEventListener("fetch", (event) => {
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

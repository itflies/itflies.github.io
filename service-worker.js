const CACHE_NAME = "site-cache-v1";
// const CACHE_NAME = "site-cache-v2"; // Falls du neue Bilder hochlädst und sich der Name nicht ändert, kannst du einfach das CACHE_NAME im service-worker.js aktualisieren. vorher "site-cache-v1"

const ASSETS = [
  "/", // Startseite
  "/index.html",
  "/manifest.json",
  "/robots.txt",
  "/sitemap.xml",

  // CSS-Dateien (angepasst an /assets/css/)
  "/assets/css/all.css",
  "/assets/css/all.min.css",
  "/assets/css/fontawesome.css",
  "/assets/css/fontawesome.min.css",
  "/assets/css/main.css",
  "/assets/css/mobile.css",

  // JavaScript-Dateien (angepasst an /assets/js/)
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

  // Bilder (angepasst an /images/)
  "/images/home.png",
  "/images/about/knp.jpg",
  "/images/logo.png"
];

// Service Worker installieren und Dateien cachen
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets...");
      return cache.addAll(ASSETS);
    }).catch(error => console.error("Cache-Fehler:", error))
  );
});

// Abrufen der Dateien aus dem Cache oder vom Netzwerk
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    }).catch(error => console.error("Fetch-Fehler:", error))
  );
});

// Cache aktualisieren, wenn eine neue Version verfügbar ist
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Alten Cache löschen:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fehlerbehandlung hinzufügen (hilft beim Debugging)
self.addEventListener("error", (event) => {
  console.error("Service Worker Fehler:", event);
});

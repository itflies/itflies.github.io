/*!
 * itFlies GmbH Website by @itflies.ch - https://itflies.ch
 * Copyright 2025 itFlies GmbH
 * INFO: service-worker.js wäre für diese Website grundsätzlich nicht erforderlich. Da wir unser Standardprodukt OVL-Portal mit service-worker.js betreiben haben wir diesen auch auf unserer Website eingebunden.
 */

const CACHE_NAME = "site-cache-v17"; // Versionsnummer erhöhen bei Updates (z.B. neue Bilder)

const ASSETS = [
  "/",
  "/index.html",
  "/assets/css/style.css",
  "/assets/js/main.js",
  "/assets/images/logo.png"
];

// Service Worker installieren und Assets cachen
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker installiert. Caching folgender Assets:");
      console.log(ASSETS);

      return cache.addAll(ASSETS)
        .catch((error) => console.warn("Fehler beim Cachen von Assets:", error));
    })
  );
  self.skipWaiting(); // Service Worker sofort aktivieren
});

// Fetch-Event: Inhalte aus dem Cache abrufen oder aus dem Netzwerk laden
self.addEventListener("fetch", (event) => {
  if (!event.request.url.startsWith(self.location.origin)) {
    return; // Ignoriere externe Anfragen
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

// Alte Caches löschen & sofortiges Update für alle Tabs
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
  self.clients.claim(); // Erzwingt, dass alle Seiten die neue Version nutzen
});

// Fehlerprotokollierung für Debugging
self.addEventListener("error", (event) => {
  console.error("Service Worker Fehler:", event);
});
// Leer lassen, um alten Service Worker zu deaktivieren
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
const CACHE_NAME = "antonella-cumple-v1";
const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./antonella.jpg",
  "./icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((respuesta) => respuesta || fetch(event.request))
  );
});
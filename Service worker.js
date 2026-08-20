const CACHE_NAME = "antonella-diario-v2"; // 👈 cambia este número cada vez que actualices el sitio
const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./antonella.jpg",
  "./icon.png"
];

// Al instalar: guarda una copia de los archivos base
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS))
  );
  self.skipWaiting(); // activa la nueva versión de inmediato
});

// Al activar: borra cachés viejas de versiones anteriores
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(
        nombres.map((nombre) => {
          if (nombre !== CACHE_NAME) {
            return caches.delete(nombre);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Al pedir una página: intenta primero por internet (para tener siempre lo último),
// y si no hay internet, usa la copia guardada
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((respuesta) => {
        const copia = respuesta.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
        return respuesta;
      })
      .catch(() => caches.match(event.request))
  );
});

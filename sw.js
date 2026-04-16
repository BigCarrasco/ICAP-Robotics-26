const CACHE_NAME = 'icap-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/js/shared-layout.js',
  '/assets/css/ui-library.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Si está en cache, lo sirve rápido
        }
        return fetch(event.request); // Si no, lo pide de internet
      })
  );
});

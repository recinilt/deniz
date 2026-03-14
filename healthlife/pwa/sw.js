var CACHE_NAME = 'healthlife-v1';
var urlsToCache = [
  './',
  './healthlife.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // Worker API isteklerini cache'leme (her zaman güncel veri lazım)
  if (event.request.url.indexOf('workers.dev') !== -1) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request).then(function(fetchResponse) {
        if (fetchResponse && fetchResponse.status === 200) {
          var responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return fetchResponse;
      }).catch(function() {
        // Offline ise cache'den dön
        if (event.request.mode === 'navigate') {
          return caches.match('./healthlife.html');
        }
      });
    })
  );
});

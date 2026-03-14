var CACHE_NAME = 'aractakip-v1';

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.map(function(name) { return caches.delete(name); }));
    }).then(function() { return caches.open(CACHE_NAME); })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // API istekleri - sadece network
  if (event.request.url.indexOf('workers.dev') !== -1) {
    return event.respondWith(fetch(event.request));
  }
  // Her şey network-first: önce internetten çek, başarısız olursa cache
  event.respondWith(
    fetch(event.request).then(function(response) {
      if (response && response.status === 200) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, clone);
        });
      }
      return response;
    }).catch(function() {
      return caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        if (event.request.mode === 'navigate') return caches.match('./arac-takip.html');
      });
    })
  );
});

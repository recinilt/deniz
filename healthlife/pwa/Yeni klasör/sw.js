var CACHE_NAME = 'healthlife-v2';

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
  // Firebase API istekleri - sadece network (cache'leme)
  if (event.request.url.indexOf('firebasedatabase.app') !== -1 ||
      event.request.url.indexOf('googleapis.com') !== -1 ||
      event.request.url.indexOf('gstatic.com/firebasejs') !== -1 ||
      event.request.url.indexOf('firebaseapp.com') !== -1) {
    return event.respondWith(fetch(event.request));
  }
  // Her şey network-first
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
        if (event.request.mode === 'navigate') return caches.match('./healthlife.html');
      });
    })
  );
});

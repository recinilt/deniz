/* Yûnus Emre Dîvânı — çevrimdışı service worker */
const CACHE = 'ye-divan-v2';
const ASSETS = [
  './', './index.html', './manifest.json',
  './icon-192.png', './icon-512.png', './icon-512-maskable.png',
  './apple-touch-icon.png', './favicon-32.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.allSettled(ASSETS.map((u) => c.add(u)));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function update(req) {
  try {
    const res = await fetch(req);
    const url = new URL(req.url);
    if (url.origin === location.origin && res.ok) {
      const c = await caches.open(CACHE);
      await c.put(req, res.clone());
    }
    return res;
  } catch (err) { return null; }
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const isNav = req.mode === 'navigate' || req.destination === 'document';
  e.respondWith((async () => {
    const cached = await caches.match(req);
    if (isNav) {
      // HTML: stale-while-revalidate (anında aç, arka planda güncelle)
      if (cached) { e.waitUntil(update(req)); return cached; }
      return (await update(req)) || (await caches.match('./index.html')) ||
             new Response('Çevrimdışı', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    // statik: cache-first
    if (cached) return cached;
    const res = await update(req);
    if (res) return res;
    return new Response('', { status: 504 });
  })());
});

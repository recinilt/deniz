// 112 Algoritmalar service worker — sürüm: 2026.11.28-e0e453
const CEKIRDEK='alg-cekirdek-2026.11.28-e0e453';
const SAYFA='alg-sayfa-v1'; // şema görselleri (sürümden bağımsız; sayfa içeriği değişirse adı değiştirin)
const DOSYALAR=['./','index.html','manifest.webmanifest','ikon/ikon-192.png','ikon/ikon-512.png','ikon/ikon-maskable-512.png','ikon/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CEKIRDEK).then(c=>c.addAll(DOSYALAR)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.startsWith('alg-cekirdek-')&&n!==CEKIRDEK).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==location.origin)return;
  // şema görselleri ve PDF: önce önbellek
  if(/\/sayfalar\/\d+\.webp$/.test(u.pathname)||/\.pdf$/i.test(u.pathname)){
    e.respondWith(caches.open(SAYFA).then(async c=>{const m=await c.match(r,{ignoreSearch:true});if(m)return m;const n=await fetch(r);if(n.ok&&!/\.pdf$/i.test(u.pathname))c.put(r,n.clone());return n;}));
    return;
  }
  // sayfa: ağ öncelikli (güncel kalsın), çevrimdışıysa önbellek
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(n=>{const k=n.clone();caches.open(CEKIRDEK).then(c=>c.put('index.html',k));return n;}).catch(()=>caches.match('index.html',{ignoreSearch:true}).then(m=>m||caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r)));
});

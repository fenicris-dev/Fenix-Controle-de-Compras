/* Fênix | Controle de Compras — service worker (v2.9)
   Rede primeiro, com cache de reserva para abrir sem internet.
   Só guarda o próprio app, o fenix-core e o SDK do Firebase (gstatic). */
const CACHE = 'fenix-compras-v2.9';
const HOSTS = [self.location.host, 'www.gstatic.com', 'fenicris-dev.github.io'];
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!HOSTS.includes(url.host)) return;
  e.respondWith(
    fetch(req).then(res => {
      if (res && res.status === 200) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
      return res;
    }).catch(() => caches.match(req).then(r => r || (req.mode === 'navigate' ? caches.match('index.html') : undefined)))
  );
});

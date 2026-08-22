/* Lalu & Peelu — a small offline cache so the box works without a signal,
   and so Chrome offers "Add to home screen" on Android. */
const CACHE = 'lalu-peelu-v1';
const ASSETS = [
  '/lalu-peelu.html',
  '/lalu-peelu.webmanifest',
  '/assets/images/lalu-peelu/icon-192.png',
  '/assets/images/lalu-peelu/icon-512.png',
  '/assets/images/lalu-peelu/icon-512-maskable.png',
  '/assets/images/lalu-peelu/apple-touch-icon.png',
  '/assets/images/lalu-peelu/favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.allSettled(ASSETS.map(u => c.add(u))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // the page itself: fresh when online, cached copy when not
  if (req.mode === 'navigate' || req.destination === 'document'){
    e.respondWith(fetch(req)
      .then(res => { const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then(r => r || caches.match('/lalu-peelu.html'))));
    return;
  }
  // icons and the manifest: cached first, they never change within a version
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok && ASSETS.some(a => req.url.endsWith(a))){
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy));
    }
    return res;
  }).catch(() => hit || new Response('offline', {status: 504, statusText: 'offline'}))));
});

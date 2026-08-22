/* Lalu & Peelu — keeps the whole box saved on the phone, so it still works
   with no internet, and so Chrome offers "Add to home screen" on Android. */
const CACHE = 'lalu-peelu-v2';

/* everything the page needs — it is one self-contained file plus its icons */
const ASSETS = [
  '/lalu-peelu.html',
  '/lalu-peelu.webmanifest',
  '/assets/images/lalu-peelu/icon-192.png',
  '/assets/images/lalu-peelu/icon-512.png',
  '/assets/images/lalu-peelu/icon-512-maskable.png',
  '/assets/images/lalu-peelu/apple-touch-icon.png',
  '/assets/images/lalu-peelu/favicon-32.png',
  '/assets/images/lalu-peelu/og.png'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // one bad file must not stop the rest from being saved
    await Promise.allSettled(ASSETS.map(u => cache.add(new Request(u, {cache: 'reload'}))));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch { return; }
  if (url.origin !== location.origin) return;

  // The page: try the network first so updates arrive, fall back to the saved
  // copy when there is no signal.
  if (req.mode === 'navigate' || req.destination === 'document'){
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch {
        return (await caches.match(req)) ||
               (await caches.match('/lalu-peelu.html')) ||
               new Response('<h1>Offline</h1><p>Open this once with internet, then it works offline.</p>',
                            {headers: {'Content-Type': 'text/html'}, status: 200});
      }
    })());
    return;
  }

  // Icons and the manifest: use the saved copy first, they do not change.
  e.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res.ok && url.pathname.startsWith('/assets/images/lalu-peelu/')){
        const cache = await caches.open(CACHE);
        cache.put(req, res.clone());
      }
      return res;
    } catch {
      return new Response('', {status: 504, statusText: 'offline'});
    }
  })());
});

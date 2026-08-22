/* Lalu & Peelu — keeps the whole box saved on the phone, so it still works
   with no internet, and so Chrome offers "Add to home screen" on Android.

   Deliberately written in older JavaScript: no optional catch binding and no
   Promise.allSettled, both of which are syntax/runtime errors on the Chrome
   builds that ship with older Android tablets. If this file fails to parse,
   nothing gets saved and the installed app shows a blank page offline. */
var CACHE = 'lalu-peelu-v3';

var ASSETS = [
  '/lalu-peelu.html',
  '/lalu-peelu.webmanifest',
  '/assets/images/lalu-peelu/icon-192.png',
  '/assets/images/lalu-peelu/icon-512.png',
  '/assets/images/lalu-peelu/icon-512-maskable.png',
  '/assets/images/lalu-peelu/apple-touch-icon.png',
  '/assets/images/lalu-peelu/favicon-32.png',
  '/assets/images/lalu-peelu/og.png'
];

/* save each file on its own, so one failure cannot stop the rest */
function cacheAll(cache) {
  return Promise.all(ASSETS.map(function (url) {
    return fetch(url, {cache: 'reload'}).then(function (res) {
      if (res && res.ok) return cache.put(url, res);
    }).catch(function () { /* skip this one */ });
  }));
}

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(cacheAll)
      .then(function () { return self.skipWaiting(); })
      .catch(function () {})
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
     .catch(function () {})
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== location.origin) return;

  /* the page itself: fresh when online, the saved copy when there is no signal */
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || caches.match('/lalu-peelu.html');
        }).then(function (hit) {
          return hit || new Response(
            '<h1>Offline</h1><p>Open this once with internet, then it works offline.</p>',
            {headers: {'Content-Type': 'text/html'}});
        });
      })
    );
    return;
  }

  /* icons and the manifest: the saved copy first, they do not change */
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.ok && url.pathname.indexOf('/assets/images/lalu-peelu/') === 0) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
        }
        return res;
      }).catch(function () {
        return new Response('', {status: 504, statusText: 'offline'});
      });
    })
  );
});

/* Retired. The app now lives at /lalu/ with its own worker at /lalu/sw.js.
   This file only exists to unregister itself and clear what it cached, so any
   device that installed the earlier version lets go of it cleanly. */
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { return caches.delete(k); }));
    }).then(function () {
      return self.registration.unregister();
    }).then(function () {
      return self.clients.matchAll();
    }).then(function (clients) {
      clients.forEach(function (c) { c.navigate('/lalu/'); });
    }).catch(function () {})
  );
});

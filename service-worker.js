const CACHE_VERSION = 'v2';
const CACHE_NAME = `pomotask-app-shell-${CACHE_VERSION}`;
const APP_SHELL = ['./', './index.html', './manifest.webmanifest', './service-worker.js'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
  })());
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    const clients = await self.clients.matchAll({ type: 'window' });
    for (const client of clients) client.postMessage({ type: 'SW_UPDATE_AVAILABLE' });
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request);

    if (cached) {
      event.waitUntil((async () => {
        try {
          const fresh = await fetch(event.request);
          if (fresh && fresh.status === 200 && fresh.type === 'basic') {
            await cache.put(event.request, fresh.clone());
          }
        } catch {}
      })());
      return cached;
    }

    try {
      const response = await fetch(event.request);
      if (response && response.status === 200 && response.type === 'basic') {
        await cache.put(event.request, response.clone());
      }
      return response;
    } catch {
      return (await cache.match('./index.html')) || new Response('Offline', { status: 503, statusText: 'Offline' });
    }
  })());
});

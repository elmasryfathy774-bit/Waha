const CACHE_NAME = 'waferha-shell-v8';
const ASSETS = ['./', './index.html'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.map(k => k !== CACHE_NAME && caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => { if (e.request.method !== 'GET') return; e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { caches.open(CACHE_NAME).then(c => c.put(e.request, res.clone())); return res; }).catch(() => caches.match('./index.html')))); });
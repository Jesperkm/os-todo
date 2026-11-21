const CACHE = 'todo-v1';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});
self.addEventListener('notificationclick', e => { e.notification.close(); e.waitUntil(clients.openWindow('./')); });
// Klar til rigtig push (valgfrit trin 2)
self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : {title: 'Påmindelse', body: ''};
  e.waitUntil(self.registration.showNotification(d.title, {body: d.body, icon: 'icon-192.png'}));
});

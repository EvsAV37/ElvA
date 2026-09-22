// Фоновый скрипт ElvA. Живёт отдельно от страницы и принимает push-уведомления,
// даже когда приложение закрыто.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

// Пришло уведомление с сервера — показываем его.
self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) { data = { body: event.data && event.data.text() }; }
  const title = data.title || 'ElvA';
  event.waitUntil(self.registration.showNotification(title, {
    body: data.body || '',
    icon: 'icon-192.png',
    tag: data.tag || undefined,        // одинаковый tag заменяет старое уведомление, а не копит их
    renotify: !!data.tag,
    data: { url: data.url || './' }
  }));
});

// Нажали на уведомление — открываем приложение (или переключаемся в уже открытое).
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = new URL(event.notification.data.url || './', self.registration.scope).href;
  event.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const w of wins) {
      if (w.url.startsWith(self.registration.scope)) { await w.focus(); return; }
    }
    await self.clients.openWindow(url);
  })());
});

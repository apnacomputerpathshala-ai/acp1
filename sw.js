const CACHE_NAME = 'acp-portal-v1';
const assets = [
  './acp10.html',
  './manifest.json',
  './logo-.jpg'
];

// इंस्टॉल होने पर फाइलों को कैश करना
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// ऑफलाइन सपोर्ट के लिए फेच इवेंट
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

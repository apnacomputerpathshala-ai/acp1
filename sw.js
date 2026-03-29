const CACHE_NAME = 'acp-portal-v1';
const assets = [
  './index.html',
  './manifest.json',
  './logo-.jpg'
];

// 1. Install Event: फाइलों को कैश में सेव करना
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// 2. Activate Event: पुराने और बेकार कैश को डिलीट करना (यहाँ जोड़ा गया है)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// 3. Fetch Event: ऑफलाइन सपोर्ट के लिए
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

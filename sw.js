self.addEventListener('install', (e) => {
  console.log('Service Worker Installed');
});

self.addEventListener('fetch', (e) => {
  // यह ऐप को ऑफलाइन चलाने या कैश करने में मदद करता है
  e.respondWith(fetch(e.request));
});
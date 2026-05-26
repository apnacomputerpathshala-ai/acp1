const CACHE_NAME = 'acp-portal-v10';

const assets = [
  './',
  './index.html',
  './manifest.json',
  './logo-.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// 1. Install Event (अब अगर कोई एक फाइल मिसिंग भी होगी, तो ऐप इंस्टॉल होना नहीं रुकेगा)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets');
      return Promise.allSettled(assets.map(url => cache.add(url).catch(err => console.log('Cache error for:', url))));
    })
  );
});

// 2. Activate Event
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

// 3. Fetch Event (Supabase और OneSignal को Cache से आज़ाद कर दिया गया है)
self.addEventListener('fetch', (e) => {
  // अगर रिक्वेस्ट Supabase या OneSignal की है, तो उसे सीधा इंटरनेट से चलने दें
  if (e.request.url.includes('supabase.co') || e.request.url.includes('onesignal.com') || e.request.url.includes('zegocloud')) {
      return; 
  }

  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});


const CACHE_NAME = 'foodie-app-v1';
const RUNTIME_CACHE = 'foodie-runtime-v1';

// Ressources à mettre en cache lors de l'installation
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://fonts.gstatic.com',
  'https://fonts.googleapis.com'
];

// Installation du service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Cache ouvert');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('✅ Ressources mises en cache');
        return self.skipWaiting();
      })
  );
});

// Activation du service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('🗑️ Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker activé');
      return self.clients.claim();
    })
  );
});

// Stratégie de cache : Network First avec fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-HTTP
  if (!request.url.startsWith('http')) return;

  // Stratégie pour les API (Network First)
  if (url.pathname.startsWith('/api/') || url.hostname.includes('supabase')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Mettre en cache les réponses réussies
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback vers le cache si offline
          return caches.match(request);
        })
    );
    return;
  }

  // Stratégie pour les images (Cache First)
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then(response => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        });
      })
    );
    return;
  }

  // Stratégie par défaut : Network First
  event.respondWith(
    fetch(request)
      .then(response => {
        // Ne pas mettre en cache les erreurs
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(RUNTIME_CACHE).then(cache => {
          cache.put(request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // Fallback vers le cache
        return caches.match(request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Page offline par défaut
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});

// Gestion des messages
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

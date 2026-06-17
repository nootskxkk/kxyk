const CACHE = 'gridmap-public-v2-5-85';
const ASSET_VERSION = 'v2-5-85-gridmap';
const LEGACY_CACHE_RE = /^(gridmap-|pathfinder-|search-assets-|lookup-|mymate-|dogbones-)/i;
const APP_SHELL = [
  './',
  './index.html',
  `./manifest.webmanifest?v=${ASSET_VERSION}`,
  `./version.json?v=${ASSET_VERSION}`,
  `./styles.css?v=${ASSET_VERSION}`,
  `./config/app-config.js?v=${ASSET_VERSION}`,
  `./app.js?v=${ASSET_VERSION}`,
  `./modules/scroll-unlock.js?v=${ASSET_VERSION}`,
  './sw.js',
  './favicon-16.png',
  './favicon-32.png',
  './logo.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './developer-dog.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key !== CACHE && LEGACY_CACHE_RE.test(key))
        .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

function isAppShellRequest(url, req) {
  if (req.mode === 'navigate') return true;
  return /\/(index\.html|app\.js|styles\.css|sw\.js|version\.json|manifest\.webmanifest)$/.test(url.pathname) ||
    /\/config\/app-config\.js$/.test(url.pathname) ||
    /\/modules\/scroll-unlock\.js$/.test(url.pathname) ||
    /\/(favicon-16\.png|favicon-32\.png|logo\.png)$/.test(url.pathname) ||
    /\/icons\/(icon-192\.png|icon-512\.png|apple-touch-icon\.png)$/.test(url.pathname);
}

function networkFirst(req) {
  return fetch(req, { cache: 'no-store' })
    .then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(cache => cache.put(req, copy)).catch(() => {});
      return res;
    })
    .catch(() => caches.match(req, { ignoreSearch: true })
      .then(cached => cached || caches.match('./index.html', { ignoreSearch: true })));
}

function cacheFirst(req) {
  return caches.match(req, { ignoreSearch: false })
    .then(cached => cached || fetch(req).then(res => {
      if (!res || res.status !== 200 || res.type === 'opaque') return res;
      const copy = res.clone();
      caches.open(CACHE).then(cache => cache.put(req, copy)).catch(() => {});
      return res;
    }));
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  if (isAppShellRequest(url, req)) {
    event.respondWith(networkFirst(req));
    return;
  }

  event.respondWith(cacheFirst(req));
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data && event.data.type === 'CLEAR_MYMATE_CACHES') {
    event.waitUntil(
      caches.keys()
        .then(keys => Promise.all(keys
          .filter(key => LEGACY_CACHE_RE.test(key))
          .map(key => caches.delete(key))
        ))
    );
  }
});

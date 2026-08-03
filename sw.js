const CACHE_NAME = "ndrt-site-v1";
const BASE = self.registration.scope;

const CORE_PATHS = [
  "",
  "index.html",
  "citizen-science.html",
  "privacy.html",
  "accessibility.html",
  "news/",
  "manifest.webmanifest",
  "assets/css/ndrt.css",
  "assets/css/site-tools.css",
  "assets/js/site-tools.js",
  "assets/icons/favicon-32.png",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/maskable-512.png"
];

const CORE_URLS = CORE_PATHS.map((path) => new URL(path, BASE).href);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(
        CORE_URLS.map((url) =>
          cache.add(new Request(url, { cache: "reload" }))
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const requestUrl = new URL(request.url);
  const scopeUrl = new URL(BASE);

  if (requestUrl.origin !== scopeUrl.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          return (
            (await caches.match(request)) ||
            (await caches.match(new URL("index.html", BASE).href))
          );
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});

const staticCacheName = "site-static"
const dynamicCacheName = "site-dynamic"
const assets = [
  "/",
  "/index.html",

  "/assets/js/main.js",
  "/assets/js/cards.js",

  "/assets/styles/styles.css",
]

// insatall service worker
self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(assets)
    })
  )
})

// active event
self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
        .map((key) => caches.delete(key))
      )
    })
  )
})

// fetch event
self.addEventListener("fetch",evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        // Check if the response is valid (not an error)
        if (!fetchRes || fetchRes.status !== 200 || fetchRes.type !== "basic") {
          return fetchRes;
        }
        
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone())
          return fetchRes
        })
      })
    })
  )
})
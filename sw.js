var APP_PREFIX = 'DiceRoller_';
var VERSION = 'v_0.0.1';
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/icon.png",
  "./assets/index.js",
  "./assets/rando_2.0.0.js",
  "./assets/styles.css",
  "./assets/traduction.js",
]

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (request) {
      return request || fetch(e.request);
    })
  )
})


self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS)
    })
  )
})


self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})
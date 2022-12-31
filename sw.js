var APP_PREFIX = 'DiceRoller_';
var VERSION = 'v_0.1.0';
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/icon.png",
  "./js/index.js",
  "./js/rando_2.0.0.js",
  "./js/traduction.js",
  "./styles/index.css",
  "./styles/dice-screen.css",
  "./styles/dice.css",
  "./styles/selection-screen.css",
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
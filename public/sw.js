const OFFLINE_CACHE_NAME = 'offline'
const OFFLINE_URL = 'offline.html'
self.addEventListener('install', function (event) {
  console.log('## service worker install')
  // Service worker는 waitUntil안의 코드가 실행되기전까지 설치되지 않는다.
  event.waitUntil(
    (async () => {
      const cache = await caches.open(OFFLINE_CACHE_NAME)
      // Setting {cache: 'reload'} in the new request will ensure that the
      // response isn't fulfilled from the HTTP cache; i.e., it will be from
      // the network.
      //  The browser fetches the resource from the remote server without first looking in the cache, but then will update the cache with the downloaded resource.
      await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }))
    })()
  )
  // 기존에 서비스 워커가 존재하던 경우, 새로운 버전을 백그라운드에서 설치하지만 활성화는 아직 하지 않습니다. 이 시점의 워커를 대기 중인 워커라고 부릅니다. 대기 중인 워커는 이전 버전의 서비스 워커를 사용하는 페이지가 모두 닫힌 경우 활성화되어 활성 워커가 됩니다.
  // => 대기중인 서비스워커를 바로 활성 서비스 워커로 바꿔주기 위해 skipWaiting을 사용한다.
  self.skipWaiting()
})
self.addEventListener('activate', (event) => {
  // navigationPreload는 service worker boot-up time으로 인한 request delay를 방지해준다.
  event.waitUntil(
    (async () => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable()
      }
    })()
  )
  // Tell the active service worker to take control of the page immediately.
  self.clients.claim()
})
self.addEventListener('fetch', (event) => {
  console.log('## intercept request', event.request)
  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(event.request)
        return networkResponse
      } catch (error) {
        // catch 블록은 네트워크 에러같은 exception이 있을 때만 호출된다.
        // 4xx or 5xx 범위의 valid HTTP response일 때는 catch 블록이 호출되지 않는다.
        const cache = await caches.open(OFFLINE_CACHE_NAME)
        const cachedResponse = await cache.match(OFFLINE_URL)
        return cachedResponse
      }
    })()
  )
})

import { useEffect } from 'react'

function useServiceWorker() {
  useEffect(() => {
    const onLoad = () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('## service worker registration success', registration)
          })
          .catch((err) => {
            console.log('## service worker registration failed', err)
          })
      }
    }

    window.addEventListener('load', onLoad)

    return () => window.removeEventListener('load', onLoad)
  }, [])
}

export default useServiceWorker

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Global } from '@emotion/react'
import { resetStyle } from '@/styles/resetStyle'
import { RecoilRoot } from 'recoil'
import { firebaseAuth } from '@/service/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useServiceWorker from '@/hooks/useServiceWorker'
import useViewportHeight from '@/hooks/useViewportHeight'

function MyApp({ Component, pageProps }: AppProps) {
  useViewportHeight()
  useServiceWorker()
  const [queryClient] = useState(() => new QueryClient())

  const router = useRouter()
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        void router.replace('/login')
      }
    })
  }, [])

  return (
    <>
      <Head>
        <title>Juniduler</title>
        <meta
          name="viewport"
          content="width=device-width, viewport-fit=cover, initial-scale=1, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Global styles={resetStyle} />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  )
}

export default MyApp

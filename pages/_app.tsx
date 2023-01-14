import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Global } from '@emotion/react'
import { resetStyle } from '@/styles/resetStyle'
import { RecoilRoot } from 'recoil'
import { firebaseAuth } from '@/service/auth/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  // console.log('@@firebaseAuth.currentUser', )
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
        <title>주니줄러(juniduler)</title>
        <meta name="viewport" content="width=device-width, viewport-fit=cover, initial-scale=1" />
      </Head>
      <Global styles={resetStyle} />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  )
}

export default MyApp

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Global } from '@emotion/react'
import { resetStyle } from '@/styles/resetStyle'
import { RecoilRoot } from 'recoil'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>주니줄러</title>
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

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Global } from '@emotion/react'
import { resetStyle } from '@/styles/resetStyle'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next.js Starter</title>
        <meta name="viewport" content="width=device-width, viewport-fit=cover, initial-scale=1" />
      </Head>
      <Global styles={resetStyle} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

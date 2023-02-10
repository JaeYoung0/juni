import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Global } from '@emotion/react'
import { resetStyle } from '@/styles/resetStyle'
import { RecoilRoot } from 'recoil'
import { useState } from 'react'
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query'
import useServiceWorker from '@/hooks/useServiceWorker'
import useViewportHeight from '@/hooks/useViewportHeight'
import RootDialog from '@/components/Dialogs/RootDialog'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import weekday from 'dayjs/plugin/weekday'
import object from 'dayjs/plugin/toObject'
import isToday from 'dayjs/plugin/isToday'
import isBetween from 'dayjs/plugin/isBetween'
import isoWeek from 'dayjs/plugin/isoWeek'
import locale from 'dayjs/locale/ko'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.locale({
  ...locale,
  weekStart: 1, // 월요일을 한주의 시작으로 본다.
})
dayjs.extend(utc)
dayjs.extend(weekday)
dayjs.extend(object)
dayjs.extend(isToday)
dayjs.extend(isBetween)
dayjs.extend(weekOfYear)
dayjs.extend(isToday)
dayjs.extend(isoWeek)

function MyApp({ Component, pageProps }: AppProps) {
  useViewportHeight()
  useServiceWorker()
  const [queryClient] = useState(() => new QueryClient())

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
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <Component {...pageProps} />
            <RootDialog />
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default MyApp

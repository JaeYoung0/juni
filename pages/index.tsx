// import { dehydrate, QueryClient } from '@tanstack/react-query'
// import { QUERY_KEY_HEAD } from '@/service/aphorismAdapter'
// import { getAphorismList } from '@/service/api/aphorism'
// import nookies from 'nookies'
// import { GetServerSidePropsContext } from 'next'
import _Index from '@/pages/home'

export default function Index() {
  return <_Index />
}

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const cookies = nookies.get(ctx)
//   const userId = cookies.juni_uid

//   const queryClient = new QueryClient()

//   // 필요한 queryClient 데이터를 SSR에서 미리 채워놓는다.
//   await Promise.all([
//     queryClient.prefetchQuery([QUERY_KEY_HEAD], () => getAphorismList({ userId })),
//   ])

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }

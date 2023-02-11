import Login from '@/pages/login'
import { GetServerSidePropsContext } from 'next'
import nookies, { destroyCookie } from 'nookies'

export default function _Login() {
  return <Login />
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = nookies.get(ctx)

  if (cookies.login_try) {
    destroyCookie(ctx, 'login_try')
    return {
      redirect: {
        destination: '/auth',
      },
    }
  }

  return {
    props: {},
  }
}

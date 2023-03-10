import { firebaseAuth } from '@/service/authAdapter'
import { useUserStore } from '@/service/userAdapter'
import { JSX } from '@emotion/react/jsx-runtime'
import { WithConditionalCSSProp } from '@emotion/react/types/jsx-namespace'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// TODO. cookie auth ssr, 인증 이후 리디렉션 화면 수정
type Props<T> = JSX.IntrinsicAttributes & WithConditionalCSSProp<T>
/**
 *
 * 인증된 유저만 진입할 수 있는 페이지를 감싸는 HOC
 */
export default function withAuth<P extends Props<P>>(WrappedComponent: NextPage<P>) {
  return (props: P) => {
    const router = useRouter()

    const { updateUser } = useUserStore()

    useEffect(() => {
      firebaseAuth.onAuthStateChanged((user) => {
        if (!user) {
          void router.replace('/login')
        } else {
          const { uid, displayName } = user

          // 페이지를 새로고침하더라도 firebase auth 세팅이 되어 있으면 현재 유저를 저장
          updateUser({
            userId: uid,
            name: displayName ?? '이름 없음',
          })
        }
      })
    }, [])

    return <WrappedComponent {...props} />
  }
}

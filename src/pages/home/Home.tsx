import * as S from './Home.style'
import Calendar from '@/components/Calendar'
import TodayGrid from '@/components/TodayGrid'
import { useEffect } from 'react'
import { useUserAtom } from '@/domain/user'
import { firebaseAuth, useAuth } from '@/service/auth'
import { useRouter } from 'next/router'
function Home() {
  const [userAtom, setUserAtom] = useUserAtom()
  const router = useRouter()
  const { logout } = useAuth()

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        void router.replace('/login')
      } else {
        const { uid, displayName } = user
        setUserAtom({
          userId: uid,
          name: displayName ?? '이름 없음',
        })
      }
    })
  }, [])

  return (
    <S.Container>
      <S.Box>
        <S.UserName>
          {userAtom.name}님 안녕하세요!{' '}
          <button
            onClick={() => {
              void logout()
            }}
          >
            로그아웃
          </button>
        </S.UserName>
        <Calendar />
        <TodayGrid />
      </S.Box>
    </S.Container>
  )
}

export default Home

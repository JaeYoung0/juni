import withAuth from '@/application/withAuth'
import BasicLayout from '@/components/layouts/BasicLayout'
import MyCategories from '@/components/MyCategories'
import { useUserAtom } from '@/domain/user'
import { useAuth } from '@/service/auth'
import { useEffect } from 'react'
import * as S from './style'

function MyPage() {
  const [userAtom] = useUserAtom()
  const { logout } = useAuth()
  const handleClickButton = () => void logout()

  return (
    <BasicLayout>
      <S.UserName>
        {userAtom.userId ? (
          <>
            <span>{userAtom.name}님, 안녕하세요!</span>
            <button onClick={handleClickButton}>로그아웃</button>
          </>
        ) : null}
      </S.UserName>
      <MyCategories />
    </BasicLayout>
  )
}

export default withAuth(MyPage)

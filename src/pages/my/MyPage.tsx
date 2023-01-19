import BasicLayout from '@/components/layouts/BasicLayout'
import MyCategories from '@/components/MyCategories'
import { useUserAtom } from '@/domain/user'
import { useAuth } from '@/service/auth'
import * as S from './style'

function MyPage() {
  const [userAtom] = useUserAtom()
  const { logout } = useAuth()
  const handleClickButton = () => void logout()

  return (
    <BasicLayout>
      <S.UserName>
        {userAtom.name}님, 안녕하세요! <button onClick={handleClickButton}>로그아웃</button>
        <MyCategories />
      </S.UserName>
    </BasicLayout>
  )
}

export default MyPage

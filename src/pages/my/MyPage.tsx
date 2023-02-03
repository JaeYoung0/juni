import withAuth from '@/hoc/withAuth'
import BasicLayout from '@/components/layouts/BasicLayout'
import MyCategories from '@/components/MyCategories'
import { useAuth } from '@/service/authAdapter'
import { useUserStore } from '@/service/userAdapter'
import * as S from './style'

function MyPage() {
  const { user } = useUserStore()
  const { userId, name } = user
  const { logout } = useAuth()
  const handleClickButton = () => void logout()

  return (
    <BasicLayout>
      <S.UserName>
        {userId ? (
          <>
            <span>{name}님, 안녕하세요!</span>
            <button onClick={handleClickButton}>로그아웃</button>
          </>
        ) : null}
      </S.UserName>
      <MyCategories />
    </BasicLayout>
  )
}

export default withAuth(MyPage)

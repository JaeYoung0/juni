import BasicLayout from '@/components/layouts/BasicLayout'
import { useAuth } from '@/service/auth'
import styled from '@emotion/styled'

function Login() {
  const { googleLogin, isLoading } = useAuth()
  return (
    <BasicLayout center>
      <Text>{isLoading ? 'loading...' : '로그인 해주세요'}</Text>
      <Img onClick={() => void googleLogin()} src="/btn_google_signin_light_normal_web@2x.png" />
    </BasicLayout>
  )
}

export default Login

const Text = styled.p`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 2rem;
`

const Img = styled.img`
  width: 20rem;
`

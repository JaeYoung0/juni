import BasicLayout from '@/components/layouts/BasicLayout'
import { useAuth } from '@/service/authAdapter'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

function Login() {
  const { login, isLoading } = useAuth()
  return (
    <BasicLayout
      center
      css={css`
        background-image: url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80');
        background-size: cover;
        background-position: center;
      `}
    >
      <Text>{isLoading ? 'loading...' : '로그인 해주세요'}</Text>
      <Img onClick={() => void login()} src="/btn_google_signin_light_normal_web@2x.png" />
    </BasicLayout>
  )
}

export default Login

const Text = styled.p`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 2rem;
  text-align: center;
`

const Img = styled.img`
  width: 20rem;
`

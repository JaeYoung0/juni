import { useAuth } from '@/service/auth/auth'

function Login() {
  const { googleLogin, isLoading } = useAuth()
  return (
    <div>
      <p>로그인 해주세요</p>
      <button onClick={() => void googleLogin()}>{isLoading ? 'loading...' : '구글 로그인'}</button>
    </div>
  )
}

export default Login

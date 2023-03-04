import { createUser } from './api/user'
import {
  getAuth,
  GoogleAuthProvider,
  User,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { useRouter } from 'next/router'
import { firebaseApp } from '@/lib/firebase'
import { getUser } from '@/service/api/user'
import { AuthService } from '@/application/ports'
import { setCookie, destroyCookie } from 'nookies'

export const firebaseAuth = getAuth(firebaseApp)

export function useAuth(): AuthService {
  const router = useRouter()

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider()

      setCookie(null, 'login_try', '1')
      await signInWithRedirect(firebaseAuth, provider)
      // 리디렉션 결과는 handleRedirect 에서 처리
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error)
      }
    }
  }

  const findOrCreateUser = async (user: User) => {
    const foundUser = await getUser(user.uid)
    if (foundUser) {
      return foundUser
    } else {
      const payload = {
        userId: user.uid,
        name: user.displayName ?? '이름 없음',
      }
      await createUser(payload)
      return await getUser(user.uid)
    }
  }

  const handleRedirect = async () => {
    try {
      // signInWithRedirect의 결과를 받아오는 함수

      const userCredential = await getRedirectResult(firebaseAuth)

      alert('userCredential ok')
      if (userCredential) {
        const user = await findOrCreateUser(userCredential.user)

        alert('findOrCreateUser ok')
        setCookie(null, 'juni_uid', user.userId)
        router.replace('/')
      } else throw new Error('userCredential is null')
    } catch (error) {
      console.error('## auth handleRedirect error', error)
      if (error instanceof FirebaseError) {
        console.error('## above error is FirebaseError', error)
      }
      router.replace('/login')
    }
  }

  const logout = async () => {
    destroyCookie(null, 'juni_uid')
    await firebaseAuth.signOut()
  }

  return { login, logout, handleRedirect }
}

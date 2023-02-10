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
import { useState } from 'react'
import { firebaseApp } from '@/lib/firebase'
import { getUser } from '@/service/api/user'
import { AuthService } from '@/application/ports'

export const firebaseAuth = getAuth(firebaseApp)

export function useAuth(): AuthService {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const login = async () => {
    try {
      setIsLoading(true)
      const provider = new GoogleAuthProvider()

      await signInWithRedirect(firebaseAuth, provider)
      // 리디렉션 결과는 handleRedirect에서 처리
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error)
      }
    } finally {
      setIsLoading(false)
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
      setIsLoading(true)

      // signInWithRedirect의 결과를 받아오는 함수
      const userCredential = await getRedirectResult(firebaseAuth)
      if (userCredential) {
        const user = userCredential.user
        await findOrCreateUser(user)
        router.replace('/')
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await firebaseAuth.signOut()
  }

  return { login, isLoading, logout, handleRedirect }
}

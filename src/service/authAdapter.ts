import { createUser } from './api/user'
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { useUserStore } from '@/service/userAdapter'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { firebaseApp } from '@/lib/firebase'
import { getUser } from '@/service/api/user'
import { AuthService } from '@/application/ports'

export const firebaseAuth = getAuth(firebaseApp)

export function useAuth(): AuthService {
  const { updateUser } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const login = async () => {
    try {
      setIsLoading(true)
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(firebaseAuth, provider)
      await findOrCreateUser(user)

      const { uid, displayName } = user
      // 여기서 res를 써먹어야하지 않을까
      updateUser({ userId: uid, name: displayName ?? '이름 없음' })
      void router.replace('/')
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

  const logout = async () => {
    await firebaseAuth.signOut()
  }

  return { login, isLoading, logout }
}

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { FirebaseError } from '@firebase/util'
import { useUserAtom } from '@/domain/user/user'
import { useRouter } from 'next/router'
import { useState } from 'react'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: 'juniduler.firebaseapp.com',
  projectId: 'juniduler',
  storageBucket: 'juniduler.appspot.com',
  messagingSenderId: '667236950681',
  appId: process.env.FIREBASE_APP_ID!,
  measurementId: 'G-R0R387Q4D0',
}
const app = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(app)
const provider = new GoogleAuthProvider()

export function useAuth() {
  const [userAtom, setUserAtom] = useUserAtom()
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const googleLogin = async () => {
    try {
      setIsLoading(true)
      // await setPersistence(firebaseAuth, browserSessionPersistence)
      const { user } = await signInWithPopup(firebaseAuth, provider)
      const { uid, displayName } = user
      setUserAtom({ userId: uid, name: displayName ?? '이름 없음' })
      void router.replace('/')
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

  return { googleLogin, isLoading, logout }
}

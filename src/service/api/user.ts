import { User } from '@/domain/user'
import { firestore } from '@/lib/firebase'
import { getDoc, doc, setDoc, collection } from 'firebase/firestore/lite'

export const usersCollection = collection(firestore, 'users')

export const createUser = async ({ userId, name }: { userId: string; name: string }) => {
  await setDoc(doc(firestore, 'users', userId), {
    userId,
    name,
  })
}

export const getUser = async (userId: string): Promise<User> => {
  const docRef = doc(firestore, 'users', userId)
  const docSnap = await getDoc(docRef)
  const userProperties = docSnap.data() as User

  return userProperties
}

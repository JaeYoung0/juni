import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'juniduler.firebaseapp.com',
  projectId: 'juniduler',
  storageBucket: 'juniduler.appspot.com',
  messagingSenderId: '667236950681',
  appId: process.env.FIREBASE_APP_ID,
  measurementId: 'G-R0R387Q4D0',
}
export const firebaseApp = initializeApp(firebaseConfig)
export const firestore = getFirestore(firebaseApp)

export const testUpdate = async () => {
  await setDoc(doc(firestore, 'users', 'asdasd-gdsdfs-sss'), {
    name: 'test입니다',
  })
}

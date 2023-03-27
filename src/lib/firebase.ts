import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

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

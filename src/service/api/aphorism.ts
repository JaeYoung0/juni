import { AphorismItem } from '@/domain/aphorism'
import {
  CreateAphorismItemPayload,
  DeleteAphorismItemPayload,
  GetAphorismListPayload,
  UpdateAphorismItemPayload,
} from '@/application/ports'
import { firestore } from '@/lib/firebase'

import { addDoc, collection, query, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore/lite'

const COLLECTION_NAME = 'aphorism'
const SUB_NAME = 'myAphorism'

export const getAphorismList = async (payload: GetAphorismListPayload) => {
  const { userId } = payload

  const ref = collection(firestore, COLLECTION_NAME, userId, SUB_NAME)

  const q = query(ref)
  const querySnapShot = await getDocs(q)

  const results: AphorismItem[] = []
  querySnapShot.forEach((item) => {
    const element = {
      ...item.data(),
      aphorismId: item.id, // create할 때 빈 스트링으로 넣었던 id를 db 생성시 만들어진 id로 대체한다
    }
    results.push(element as AphorismItem)
  })

  return results
}

export const createAphorismItem = async (payload: CreateAphorismItemPayload) => {
  const { userId, ...rest } = payload
  await addDoc(collection(firestore, COLLECTION_NAME, userId, SUB_NAME), rest)
}

export const updateAphorismItem = async (payload: UpdateAphorismItemPayload) => {
  const { userId, aphorismId, ...rest } = payload
  await setDoc(doc(firestore, COLLECTION_NAME, userId, SUB_NAME, aphorismId), {
    rest,
  })
}

export const deleteAphorismItem = async (payload: DeleteAphorismItemPayload) => {
  const { userId, aphorismId } = payload
  await deleteDoc(doc(firestore, COLLECTION_NAME, userId, SUB_NAME, aphorismId))
}

// export const getCurrentAphorism = async (payload: GetCurrentAphorismItemPayload) => {
//   const { userId } = payload
//   const docRef = doc(firestore, COLLECTION_NAME, userId, 'current')

//   const docSnap = await getDoc(docRef)
//   console.log('@@docSnap', docSnap.data())
//   if (docSnap.exists()) {
//     return docSnap.data()
//   }
// }

// export const saveCurrentAphorismItem = async (payload: SaveCurrentAphorismItemPayload) => {
//   const { userId, text } = payload

//   await setDoc(doc(firestore, COLLECTION_NAME, userId, 'current'), {
//     text,
//   })
// }

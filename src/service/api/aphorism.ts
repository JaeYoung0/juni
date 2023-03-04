import { AphorismItem } from '@/domain/aphorism'
import {
  CreateAphorismItemPayload,
  DeleteAphorismItemPayload,
  GetAphorismListPayload,
  UpdateAphorismItemPayload,
  GetCurrentAphorismItemPayload,
  SaveCurrentAphorismItemPayload,
} from '@/application/ports'
import { firestore } from '@/lib/firebase'

import {
  addDoc,
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
  where,
  updateDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore/lite'

const COLLECTION_NAME = 'aphorism'
const SUB_NAME = 'myAphorism'

export const getAphorismList = async (payload: GetAphorismListPayload) => {
  const { userId } = payload

  const ref = collection(firestore, COLLECTION_NAME, userId, SUB_NAME)

  const q = query(ref, orderBy('timestamp'))
  const querySnapShot = await getDocs(q)

  const results: AphorismItem[] = []
  querySnapShot.forEach((item) => {
    const { timestamp, ...rest } = item.data()

    const element = {
      ...rest,
      aphorismId: item.id, // create할 때 빈 스트링으로 넣었던 id를 db 생성시 만들어진 id로 대체한다
    }
    results.push(element as AphorismItem)
  })

  return results
}

export const createAphorismItem = async (payload: CreateAphorismItemPayload) => {
  const { userId, ...rest } = payload

  await addDoc(collection(firestore, COLLECTION_NAME, userId, SUB_NAME), {
    ...rest,
    timestamp: serverTimestamp(),
  })
}

export const updateAphorismItem = async (payload: UpdateAphorismItemPayload) => {
  const { userId, aphorismId, ...rest } = payload
  await setDoc(doc(firestore, COLLECTION_NAME, userId, SUB_NAME, aphorismId), {
    ...rest,
    timestamp: serverTimestamp(),
  })
}

export const deleteAphorismItem = async (payload: DeleteAphorismItemPayload) => {
  const { userId, aphorismId } = payload
  await deleteDoc(doc(firestore, COLLECTION_NAME, userId, SUB_NAME, aphorismId))
}

export const getCurrentAphorism = async (payload: GetCurrentAphorismItemPayload) => {
  const { userId } = payload
  const docRef = doc(firestore, COLLECTION_NAME, userId, 'current')

  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  }
}

export const saveCurrentAphorismItem = async (payload: SaveCurrentAphorismItemPayload) => {
  const { userId, prevId, targetId } = payload

  if (prevId) {
    await updateDoc(doc(firestore, COLLECTION_NAME, userId, SUB_NAME, prevId), {
      current: false,
    })
  }

  await updateDoc(doc(firestore, COLLECTION_NAME, userId, SUB_NAME, targetId), {
    current: true,
  })
}

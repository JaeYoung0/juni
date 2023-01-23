import { PracticeItem, QUERY_KEY_HEAD } from './../domain/practice/practice'
import { useCalendarAtom } from '@/domain/calendar'
import { User } from '@/domain/user'
import { firestore } from '@/lib/firebase'
import { unixToYYYYMMDD } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { runTransaction } from 'firebase/firestore'

import {
  addDoc,
  collection,
  Timestamp,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore/lite'
import dayjs from 'dayjs'

const COLLECTION_NAME = 'practices'

export type GetPracticeItemsPayload = { currentUnix: number } & Pick<User, 'userId'>
export const getPracticeItems = async (payload: GetPracticeItemsPayload) => {
  const { currentUnix, userId } = payload
  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  const ref = collection(
    firestore,
    COLLECTION_NAME,
    userId,
    String(year),
    String(month + 1),
    String(date)
  )

  const q = query(ref)
  const querySnapShot = await getDocs(q)

  const results: PracticeItem[] = []
  querySnapShot.forEach((item) => {
    const practiceItem = {
      ...item.data(),
      id: item.id, // db 생성시 만들어진 id로 대체
    }

    results.push(practiceItem as PracticeItem)
  })

  return results
}

export const PRACTICE_CHART_SUBCOLLECTION_NAME = 'praticeChart'

// TODO. 트랜잭션으로 데이터 업데이트하기 https://cloud.google.com/firestore/docs/manage-data/transactions#transactions
export type CreatePracticeItemPayload = Pick<User, 'userId'> &
  Omit<PracticeItem, 'id'> & {
    currentUnix: number
  }
export const createPracticeItem = async (payload: CreatePracticeItemPayload) => {
  const { userId, currentUnix, ...rest } = payload
  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  const practiceItem: Omit<PracticeItem, 'id'> = {
    ...rest,
  }

  const addedDoc = await addDoc(
    collection(firestore, COLLECTION_NAME, userId, String(year), String(month + 1), String(date)),
    practiceItem
  )

  const categoryDocRef = doc(
    firestore,
    COLLECTION_NAME,
    userId,
    String(year),
    String(month + 1),
    String(date),
    addedDoc.id,
    PRACTICE_CHART_SUBCOLLECTION_NAME,
    addedDoc.id
  )
  const categoryData = {
    categoryId: rest.categoryId,
    startTime: rest.startTime,
    minutes: dayjs(rest.endTime).diff(rest.startTime, 'minutes'),
  }

  await setDoc(categoryDocRef, categoryData)
}

export type UpdatePracticeItemPayload = Partial<Omit<PracticeItem, 'id'>> &
  Pick<PracticeItem, 'id'> & {
    currentUnix: number
  } & Pick<User, 'userId'>
export const updatePracticeItem = async (payload: UpdatePracticeItemPayload) => {
  const { currentUnix, userId, id, categoryId, ...rest } = payload
  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  const docRef = doc(
    firestore,
    COLLECTION_NAME,
    userId,
    String(year),
    String(month + 1),
    String(date),
    id
  )

  const updatedItem = {
    ...rest,
    updatedAt: Timestamp.now(),
  }
  await updateDoc(docRef, { ...updatedItem })

  const categoryDocRef = doc(
    firestore,
    COLLECTION_NAME,
    userId,
    String(year),
    String(month + 1),
    String(date),
    id,
    PRACTICE_CHART_SUBCOLLECTION_NAME,
    id
  )
  const categoryData = {
    categoryId,
    startTime: rest.startTime,
    minutes: dayjs(rest.endTime).diff(rest.startTime, 'minutes'),
  }

  await updateDoc(categoryDocRef, categoryData)
}

type DeletePracticeItemPayload = Pick<User, 'userId'> & { currentUnix: number } & Pick<
    PracticeItem,
    'id'
  >
export const deletePracticeItem = async (payload: DeletePracticeItemPayload) => {
  const { userId, currentUnix, id } = payload
  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  await deleteDoc(
    doc(firestore, COLLECTION_NAME, userId, String(year), String(month + 1), String(date), id)
  )

  await deleteDoc(
    doc(
      firestore,
      COLLECTION_NAME,
      userId,
      String(year),
      String(month + 1),
      String(date),
      id,
      PRACTICE_CHART_SUBCOLLECTION_NAME,
      id
    )
  )
}

export function useCreatePracticeItem() {
  const queryClient = useQueryClient()
  const [currentUnix] = useCalendarAtom()

  return useMutation({
    mutationFn: createPracticeItem,
    onSuccess: () => {
      const { year, month, date } = unixToYYYYMMDD(currentUnix)
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD, year, month, date] })
    },
  })
}

export function useUpdatePracticeItem() {
  const queryClient = useQueryClient()
  const [currentUnix] = useCalendarAtom()
  return useMutation({
    mutationFn: updatePracticeItem,
    onSuccess: () => {
      const { year, month, date } = unixToYYYYMMDD(currentUnix)
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD, year, month, date] })
    },
  })
}

export function useDeletePracticeItem() {
  const queryClient = useQueryClient()
  const [currentUnix] = useCalendarAtom()
  return useMutation({
    mutationFn: deletePracticeItem,
    onSuccess: () => {
      const { year, month, date } = unixToYYYYMMDD(currentUnix)
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD, year, month, date] })
    },
  })
}

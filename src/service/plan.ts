import { useCalendarAtom } from '@/domain/calendar'
import { PlanItem, QUERY_KEY_HEAD } from '@/domain/plan'
import { User } from '@/domain/user'
import { firebaseApp, firestore } from '@/lib/firebase'
import { unixToYYYYMMDD } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import {
  addDoc,
  collection,
  Timestamp,
  query,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore/lite'

const COLLECTION_NAME = 'plans'

export type GetPlanItemsPayload = { currentUnix: number } & Pick<User, 'userId'>
export const getPlanItems = async (payload: GetPlanItemsPayload) => {
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

  const results: PlanItem[] = []
  querySnapShot.forEach((item) => {
    const planItem = {
      ...item.data(),
      id: item.id, // create할 때 빈 스트링으로 넣었던 id를 db 생성시 만들어진 id로 대체한다
    }
    results.push(planItem as PlanItem)
  })

  return results
}

export const PLAN_CHART_SUBCOLLECTION_NAME = 'planChart'
export type CreatePlanItemPayload = Pick<User, 'userId'> &
  Omit<PlanItem, 'id'> & {
    currentUnix: number
  }
export const createPlanItem = async (payload: CreatePlanItemPayload) => {
  const { userId, currentUnix, ...rest } = payload
  const { year, month, date } = unixToYYYYMMDD(currentUnix)
  const planItem: Omit<PlanItem, 'id'> = {
    ...rest,
  }

  const addedDoc = await addDoc(
    collection(firestore, COLLECTION_NAME, userId, String(year), String(month + 1), String(date)),
    planItem
  )

  // TODO. 분리하기.
  const categoryDocRef = doc(
    firestore,
    COLLECTION_NAME,
    userId,
    String(year),
    String(month + 1),
    String(date),
    addedDoc.id,
    PLAN_CHART_SUBCOLLECTION_NAME,
    addedDoc.id
  )

  const categoryData = {
    categoryId: rest.categoryId,
    startTime: rest.startTime,
    minutes: dayjs(rest.endTime).diff(rest.startTime, 'minutes'),
  }

  await setDoc(categoryDocRef, categoryData)
}

export type UpdatePlanItemPayload = Partial<Omit<PlanItem, 'id'>> &
  Pick<PlanItem, 'id'> & {
    currentUnix: number
  } & Pick<User, 'userId'>
export const updatePlanItem = async (payload: UpdatePlanItemPayload) => {
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
    PLAN_CHART_SUBCOLLECTION_NAME,
    id
  )
  const categoryData = {
    categoryId,
    startTime: rest.startTime,
    minutes: dayjs(rest.endTime).diff(rest.startTime, 'minutes'),
  }

  await updateDoc(categoryDocRef, categoryData)
}

type DeletePlanItemPayload = Pick<User, 'userId'> & { currentUnix: number } & Pick<PlanItem, 'id'>
export const deletePlanItem = async (payload: DeletePlanItemPayload) => {
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
      PLAN_CHART_SUBCOLLECTION_NAME,
      id
    )
  )
}

export function useCreatePlanItem() {
  const queryClient = useQueryClient()
  const [currentUnix] = useCalendarAtom()

  return useMutation({
    mutationFn: createPlanItem,
    onSuccess: () => {
      const { year, month, date } = unixToYYYYMMDD(currentUnix)
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD, year, month, date] })
    },
  })
}

export function useUpdatePlanItem() {
  const queryClient = useQueryClient()
  const [currentUnix] = useCalendarAtom()
  return useMutation({
    mutationFn: updatePlanItem,
    onSuccess: () => {
      const { year, month, date } = unixToYYYYMMDD(currentUnix)
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD, year, month, date] })
    },
  })
}

export function useDeletePlanItem() {
  const queryClient = useQueryClient()
  const [currentUnix] = useCalendarAtom()
  return useMutation({
    mutationFn: deletePlanItem,
    onSuccess: () => {
      const { year, month, date } = unixToYYYYMMDD(currentUnix)
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD, year, month, date] })
    },
  })
}

type GetPlanHistoryPayload = Pick<User, 'userId'> & {
  currentCalendar: number
}
/**
 *
 * 문서의 하위 컬렉션 나열은 웹에선 불가능. node.js에서 받아와야함
 * https://cloud.google.com/firestore/docs/query-data/get-data#list_subcollections_of_a_document
 */
export const getMonthlyPlanHistory = async ({ currentCalendar, userId }: GetPlanHistoryPayload) => {
  const { year, month, date } = unixToYYYYMMDD(currentCalendar)
  const docRef = doc(firestore, COLLECTION_NAME, userId, String(year), String(month + 1))

  const docSnap = await getDoc(docRef)
  console.log('@@docSnap', docSnap)
}

import { useCalendarAtom } from '@/domain/calendar'
import { PlanItem, QUERY_KEY_HEAD } from '@/domain/plan'
import { User } from '@/domain/user'
import { firestore } from '@/lib/firebase'
import { unixToYYYYMMDD } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  addDoc,
  collection,
  Timestamp,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore/lite'

const COLLENCTION_NAME = 'schedules' // db에서도 plans로 rename

export type GetPlanItemsPayload = { currentUnix: number } & Pick<User, 'userId'>
export const getPlanItems = async (payload: GetPlanItemsPayload) => {
  const { currentUnix, userId } = payload
  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  const ref = collection(
    firestore,
    COLLENCTION_NAME,
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

export type CreatePlanItemPayload = Pick<User, 'userId'> &
  Omit<PlanItem, 'id' | 'date'> & {
    currentUnix: number
  }
export const createPlanItem = async (payload: CreatePlanItemPayload) => {
  const { userId, currentUnix, ...rest } = payload
  const { year, month, date } = unixToYYYYMMDD(currentUnix)
  const planItem = {
    ...rest,
    updatedAt: Timestamp.now(),
  }

  await addDoc(
    collection(firestore, COLLENCTION_NAME, userId, String(year), String(month + 1), String(date)),
    planItem
  )
}

export type UpdatePlanItemPayload = Partial<Omit<PlanItem, 'id'>> &
  Pick<PlanItem, 'id'> & {
    currentUnix: number
  } & Pick<User, 'userId'>
export const updatePlanItem = async (payload: UpdatePlanItemPayload) => {
  const { currentUnix, userId, id, ...rest } = payload
  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  const docRef = doc(
    firestore,
    COLLENCTION_NAME,
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
}

type DeletePlanItemPayload = Pick<User, 'userId'> & { currentUnix: number } & Pick<PlanItem, 'id'>
export const deletePlanItem = async (payload: DeletePlanItemPayload) => {
  const { userId, currentUnix, id } = payload
  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  await deleteDoc(
    doc(firestore, COLLENCTION_NAME, userId, String(year), String(month + 1), String(date), id)
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

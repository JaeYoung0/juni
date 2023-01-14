import { useCalendarAtom } from '@/domain/calendar'
import { ScheduleItem } from '@/domain/schedule'
import { User } from '@/domain/user'
import { firestore } from '@/lib/firebase'
import { unixToYYYYMMDD } from '@/lib/utils'
import { async } from '@firebase/util'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  addDoc,
  collection,
  Timestamp,
  query,
  getDocs,
  where,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore/lite'

export type GetScheduleItemsPayload = { currentUnix: number } & Pick<User, 'userId'>
export const getScheduleItems = async (payload: GetScheduleItemsPayload) => {
  const { currentUnix, userId } = payload
  const { year, month, date } = unixToYYYYMMDD(currentUnix)
  console.log('@@userId', userId)

  const todayScheduleRef = collection(
    firestore,
    'schedules',
    userId,
    String(year),
    String(month + 1),
    String(date)
  )

  const q = query(todayScheduleRef)
  const querySnapShot = await getDocs(q)

  const scheduleItems: ScheduleItem[] = []
  querySnapShot.forEach((item) => {
    console.log('@@item', item)
    const scheduleItem = {
      id: item.id,
      ...item.data(),
    }

    scheduleItems.push(scheduleItem as ScheduleItem)
  })

  return scheduleItems
}

export type CreateScheduleItemPayload = Pick<User, 'userId'> &
  Omit<ScheduleItem, 'id' | 'date'> & {
    currentUnix: number
  }
export const createScheduleItem = async (payload: CreateScheduleItemPayload) => {
  const { userId, currentUnix, ...rest } = payload
  const { year, month, date } = unixToYYYYMMDD(currentUnix)
  const scheduleItem = {
    ...rest,
    updatedAt: Timestamp.now(),
  }

  await addDoc(
    collection(firestore, 'schedules', userId, String(year), String(month + 1), String(date)),
    scheduleItem
  )
}

export type UpdateScheduleItemPayload = Partial<Omit<ScheduleItem, 'id'>> &
  Pick<ScheduleItem, 'id'> & {
    currentUnix: number
  } & Pick<User, 'userId'>
export const updateScheduleItem = async (payload: UpdateScheduleItemPayload) => {
  const { currentUnix, userId, id, ...rest } = payload
  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  const docRef = doc(
    firestore,
    'schedules',
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

type DeleteScheduleItemPayload = Pick<User, 'userId'> & { currentUnix: number } & Pick<
    ScheduleItem,
    'id'
  >
export const deleteScheduleItem = async (payload: DeleteScheduleItemPayload) => {
  const { userId, currentUnix, id } = payload
  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  await deleteDoc(
    doc(firestore, 'schedules', userId, String(year), String(month + 1), String(date), id)
  )
}

export function useCreateScheduleItem() {
  const queryClient = useQueryClient()
  const [currentUnix] = useCalendarAtom()

  return useMutation({
    mutationFn: (payload: CreateScheduleItemPayload) => createScheduleItem(payload),
    onSuccess: () => {
      const { year, month, date } = unixToYYYYMMDD(currentUnix)

      void queryClient.invalidateQueries({ queryKey: ['@schedule', year, month, date] })
    },
  })
}

export function useUpdateScheduleItem() {
  const queryClient = useQueryClient()
  const [currentUnix] = useCalendarAtom()
  return useMutation({
    mutationFn: (payload: UpdateScheduleItemPayload) => updateScheduleItem(payload),
    onSuccess: () => {
      const { year, month, date } = unixToYYYYMMDD(currentUnix)
      void queryClient.invalidateQueries({ queryKey: ['@schedule', year, month, date] })
    },
  })
}

export function useDeleteScheduleItem() {
  const queryClient = useQueryClient()
  const [currentUnix] = useCalendarAtom()
  return useMutation({
    mutationFn: (payload: DeleteScheduleItemPayload) => deleteScheduleItem(payload),
    onSuccess: () => {
      const { year, month, date } = unixToYYYYMMDD(currentUnix)
      void queryClient.invalidateQueries({ queryKey: ['@schedule', year, month, date] })
    },
  })
}

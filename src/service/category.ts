import { useMutation, useQueryClient } from '@tanstack/react-query'
// import {  } from '@/domain/category'
import { firestore } from '@/lib/firebase'
import { User } from '@/domain/user'
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
import { CategoryItem, QUERY_KEY_HEAD } from '@/domain/category'

const COLLENCTION_NAME = 'categories' // db에서도 Categorys로 rename

export type GetCategoryItemsPayload = Pick<User, 'userId'>
export const getCategoryItems = async (payload: GetCategoryItemsPayload) => {
  const { userId } = payload

  const ref = collection(firestore, COLLENCTION_NAME, userId)

  const q = query(ref)
  const querySnapShot = await getDocs(q)

  const results: CategoryItem[] = []
  querySnapShot.forEach((item) => {
    const categoryItem = {
      ...item.data(),
      id: item.id, // create할 때 빈 스트링으로 넣었던 id를 db 생성시 만들어진 id로 대체한다
    }
    results.push(categoryItem as CategoryItem)
  })

  return results
}

export type CreateCategoryItemPayload = Pick<User, 'userId'> & Omit<CategoryItem, 'id'>
export const createCategoryItem = async (payload: CreateCategoryItemPayload) => {
  const { userId, ...rest } = payload

  await addDoc(collection(firestore, COLLENCTION_NAME, userId), rest)
  collection
}

export function useCreatePlanItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCategoryItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD] })
    },
  })
}

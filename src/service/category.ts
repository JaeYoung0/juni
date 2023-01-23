import { useMutation, useQueryClient } from '@tanstack/react-query'
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

const COLLENCTION_NAME = 'categories'

export type GetCategoryItemsPayload = Pick<User, 'userId'>
export const getCategoryItems = async (payload: GetCategoryItemsPayload) => {
  const { userId } = payload

  const ref = collection(firestore, COLLENCTION_NAME, userId, 'myCategory')

  const q = query(ref)
  const querySnapShot = await getDocs(q)

  const results: CategoryItem[] = []
  querySnapShot.forEach((item) => {
    const categoryItem = {
      ...item.data(),
      categoryId: item.id, // create할 때 빈 스트링으로 넣었던 id를 db 생성시 만들어진 id로 대체한다
    }
    results.push(categoryItem as CategoryItem)
  })

  return results
}

export type CreateCategoryItemPayload = Pick<User, 'userId'> & Omit<CategoryItem, 'categoryId'>
export const createCategoryItem = async (payload: CreateCategoryItemPayload) => {
  const { userId, ...rest } = payload

  await addDoc(collection(firestore, COLLENCTION_NAME, userId, 'myCategory'), rest)
}

export function useCreateCategoryItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCategoryItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD] })
    },
  })
}

type DeleteCategoryItemPayload = Pick<User, 'userId'> & Pick<CategoryItem, 'categoryId'>
export const deleteCategoryItem = async (payload: DeleteCategoryItemPayload) => {
  const { userId, categoryId } = payload
  await deleteDoc(doc(firestore, COLLENCTION_NAME, userId, 'myCategory', categoryId))
}

export function useDeleteCategoryItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCategoryItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD] })
    },
  })
}

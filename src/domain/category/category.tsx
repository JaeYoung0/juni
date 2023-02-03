import { getCategoryItems } from '@/service/category'
import { useQuery } from '@tanstack/react-query'
import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'
import { useUserStore } from '@/service/storeAdapter'

export type CategoryItem = {
  categoryId: string
  color: string
  name: string
}

const CategoryAtom = atom<CategoryItem>({
  key: '@category' + v1(),
  default: {
    categoryId: '',
    color: '',
    name: '',
  },
})

export function useCategoryAtom() {
  return useRecoilState(CategoryAtom)
}

export const QUERY_KEY_HEAD = '@categoryList'
export function useCategoryList() {
  const { user } = useUserStore()
  const { userId } = user

  return useQuery({
    queryKey: [QUERY_KEY_HEAD],
    queryFn: () => getCategoryItems({ userId }),
    refetchOnMount: false,
    enabled: !!userId,
    refetchOnWindowFocus: false,
  })
}

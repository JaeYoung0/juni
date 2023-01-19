import { getCategoryItems } from '@/service/category'
import { useQuery } from '@tanstack/react-query'
import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'
import { useUserAtom } from '../user'

export type CategoryItem = {
  id: string
  color: string
  name: string
}

const CategoryAtom = atom<CategoryItem>({
  key: '@category' + v1(),
  default: {
    id: '',
    color: '',
    name: '',
  },
})

export function useCategoryAtom() {
  return useRecoilState(CategoryAtom)
}

export const QUERY_KEY_HEAD = '@categoryList'
export function useCategoryList() {
  const [userAtom] = useUserAtom()

  return useQuery({
    queryKey: [QUERY_KEY_HEAD],
    queryFn: () => getCategoryItems({ userId: userAtom.userId }),
    refetchOnMount: false,
    enabled: !!userAtom.userId,
    refetchOnWindowFocus: false,
  })
}

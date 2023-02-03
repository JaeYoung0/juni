import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'
import { User } from '@/domain/user'
import { CategoryItem } from '@/domain/category'

const UserAtom = atom<User>({
  key: '@user' + v1(),
  default: {
    userId: '',
    name: '',
  },
})

export function useUserAtom() {
  return useRecoilState(UserAtom)
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

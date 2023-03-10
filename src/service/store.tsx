import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'
import { User } from '@/domain/user'
import { CategoryItem } from '@/domain/category'
import { DialogItem, DialogVariant } from '@/application/ports'
import { AphorismItem } from '@/domain/aphorism'

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

const AphorismAtom = atom<AphorismItem>({
  key: '@aphorism' + v1(),
  default: {
    aphorismId: '',
    text: '',
    current: false,
  },
})

export function useAphorismAtom() {
  return useRecoilState(AphorismAtom)
}

const DialogListAtom = atom<DialogItem<DialogVariant>[]>({
  key: '@dialog' + v1(),
  default: [],
})
export function useDialogListAtom() {
  return useRecoilState(DialogListAtom)
}

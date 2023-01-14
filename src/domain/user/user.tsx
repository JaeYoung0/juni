import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'

export type User = {
  userId: string
  name: string
}

const UserAtom = atom<User>({
  key: '@user',
  default: {
    userId: '',
    name: '',
  },
})

export function useUserAtom() {
  return useRecoilState(UserAtom)
}

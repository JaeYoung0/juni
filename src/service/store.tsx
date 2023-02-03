import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'
import { User } from '@/domain/user'

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

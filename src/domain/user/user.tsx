import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'

const UserAtom = atom({
  key: '@user' + v1(), // unique ID (with respect to other atoms/selectors)
  default: {
    userId: '',
    name: '',
  }, // default value (aka initial value)
})

export function useUserAtom() {
  return useRecoilState(UserAtom)
}

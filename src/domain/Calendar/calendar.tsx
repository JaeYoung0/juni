import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'

const CalendarAtom = atom<number>({
  key: '@calendar' + v1(),
  default: 0, // unix
})

export function useCalendarAtom() {
  return useRecoilState(CalendarAtom)
}

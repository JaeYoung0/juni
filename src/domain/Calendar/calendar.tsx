import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'

const CalendarAtom = atom({
  key: '@calendar' + v1(), // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
})

export function useCalendarAtomState() {
  return useRecoilState(CalendarAtom)
}

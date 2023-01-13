import { atom, useRecoilState } from 'recoil'

const CalendarAtom = atom({
  key: '@calendar', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
})

export function useCalendarAtomState() {
  return useRecoilState(CalendarAtom)
}

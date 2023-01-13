import { atom, useRecoilState } from 'recoil'

export type ScheduleItem = {
  id: string | number
  dateTime: number // unix timestamp
  range: { start: number; end: number }
  content: string
}

const ScheduleAtom = atom<ScheduleItem[]>({
  key: '@schedule', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
})

export function useScheduleAtomState() {
  return useRecoilState(ScheduleAtom)
}

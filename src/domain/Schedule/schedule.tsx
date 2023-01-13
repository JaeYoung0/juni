import { atom, useRecoilState } from 'recoil'

export type ScheduleItem = {
  id: string | number
  dateTime: number // unix timestamp
  range: { start: number; end: number }
  content: string
}

const ScheduleAtom = atom<ScheduleItem[]>({
  key: '@schedule',
  default: [],
})

export function useScheduleAtomState() {
  return useRecoilState(ScheduleAtom)
}

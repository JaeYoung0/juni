import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'

export type ScheduleItem = {
  id: string | number
  dateTime: number // unix timestamp
  range: { start: number; end: number }
  title: string
  content: string
}

const ScheduleAtom = atom<ScheduleItem[]>({
  key: '@schedule' + v1(),
  default: [],
})

export function useScheduleAtomState() {
  return useRecoilState(ScheduleAtom)
}

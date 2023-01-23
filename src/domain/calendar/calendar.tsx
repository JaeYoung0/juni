import dayjs from 'dayjs'
import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'

const CalendarAtom = atom<number>({
  key: '@calendar' + v1(),
  default: dayjs().unix(), // 캘린더에서 선택한 날짜의 0시 기준 unix값
})

export function useCalendarAtom() {
  return useRecoilState(CalendarAtom)
}

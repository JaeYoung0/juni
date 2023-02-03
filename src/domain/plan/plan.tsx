import { minParser, unixToYYYYMMDD } from '@/lib/utils'
import { getMonthlyPlanHistory, getPlanItems } from '@/service/plan'
import { useQuery } from '@tanstack/react-query'
import { atom, useRecoilState } from 'recoil'
import { useCalendarAtom } from '../calendar'
import { useUserStore } from '@/service/userAdapter'
import { v1 } from 'uuid'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export type PlanItem = {
  id: string
  content: string
  startTime: string // db에 utc로 저장
  endTime: string // db에 utc로 저장
  categoryId: string
}

export const DEFAULT_PLAN_ATOM: PlanItem = {
  id: '',
  content: '',
  startTime: dayjs().utc().format(),
  endTime: dayjs().utc().format(),
  categoryId: '',
}

const PlanItemAtom = atom<PlanItem>({
  key: '@PlanItem' + v1(),
  default: DEFAULT_PLAN_ATOM,
})

export function usePlanItemAtom() {
  return useRecoilState(PlanItemAtom)
}

export const QUERY_KEY_HEAD = '@planList'
export function usePlanList() {
  const [currentUnix] = useCalendarAtom()
  const { user } = useUserStore()
  const { userId } = user

  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  return useQuery({
    queryKey: [QUERY_KEY_HEAD, year, month, date],
    queryFn: () => getPlanItems({ currentUnix, userId }) ?? [],
    refetchOnMount: false,
    staleTime: 60 * 1000, // 1분, default 0
    enabled: !!userId && !!currentUnix,
    refetchOnWindowFocus: false,
  })
}

export const getStartTimeOfPlanList = (planList: PlanItem[]) => {
  let min = Number.MAX_SAFE_INTEGER
  let result = 0

  planList?.forEach((planItem) => {
    const _startTime = minParser(planItem.startTime)
    if (_startTime < min) {
      min = _startTime
    }
    result = min
  })

  return result / 60
}

// 특정 달에 계획을 세운 날짜를 리턴하는 훅
// ex. 1월 3, 5, 19일에 계획을 세운 히스토리가 있다면 3, 5, 19를 리턴
export function usePlanHistory() {
  const [currentUnix] = useCalendarAtom()
  const { user } = useUserStore()
  const { userId } = user

  const { year, month } = unixToYYYYMMDD(currentUnix)

  return useQuery({
    queryKey: [QUERY_KEY_HEAD, year, month],
    queryFn: () => getMonthlyPlanHistory({ currentCalendar: currentUnix, userId }),
    refetchOnMount: false,
    staleTime: 60 * 1000, // 1분, default 0
    enabled: !!userId,
    refetchOnWindowFocus: false,
  })
}

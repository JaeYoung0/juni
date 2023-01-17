import { totalMinParser, unixToYYYYMMDD } from '@/lib/utils'
import { getPlanItems } from '@/service/plan'
import { useQuery } from '@tanstack/react-query'
import { atom, useRecoilState } from 'recoil'
import { useCalendarAtom } from '../calendar'
import { useUserAtom } from '../user'
import { v1 } from 'uuid'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export type PlanItem = {
  id: string
  title: string
  content: string
  startTime: string | number // db에 utc로 저장 | 하루를 분으로 계산 (number)
  endTime: string | number // db에 utc로 저장 | 하루를 분으로 계산 (number)
  color: string
}

export const DEFAULT_PLAN_ATOM = {
  id: '',
  title: '',
  content: '',
  startTime: dayjs().utc().format(),
  endTime: dayjs().utc().format(),
  color: '#aaa',
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
  const [userAtom] = useUserAtom()

  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  return useQuery({
    queryKey: [QUERY_KEY_HEAD, year, month, date],
    queryFn: () => getPlanItems({ currentUnix, userId: userAtom.userId }),
    refetchOnMount: false,
    staleTime: 60 * 1000, // 1분, default 0
    enabled: !!userAtom.userId,
    refetchOnWindowFocus: false,
  })
}

export const getStartTimeOfPlanList = (planList: PlanItem[]) => {
  let min = Number.MAX_SAFE_INTEGER
  let result = 0

  planList?.forEach((planItem) => {
    const _startTime = totalMinParser(planItem.startTime)
    if (_startTime < min) {
      min = _startTime
    }
    result = min
  })

  return result / 60
}

import { unixToYYYYMMDD } from '@/lib/utils'
import { getPlanItems } from '@/service/plan'
import { useQuery } from '@tanstack/react-query'

import { useCalendarAtom } from '../calendar'
import { useUserAtom } from '../user'

export type PlanItem = {
  id: string
  title: string
  content: string
  startTime: number
  endTime: number
  color: string
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

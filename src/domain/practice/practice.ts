import { unixToYYYYMMDD } from '@/lib/utils'
import { getPracticeItems } from '@/service/practice'
import { useQuery } from '@tanstack/react-query'

import { useCalendarAtom } from '../calendar'
import { PlanItem, usePlanList } from '../plan'
import { useUserAtom } from '../user'

export type PracticeItem = Omit<PlanItem, 'color'>

export const QUERY_KEY_HEAD = '@practiceList'

export function usePracticeList() {
  const { data: plans, isLoading } = usePlanList()
  const [currentUnix] = useCalendarAtom()
  const [userAtom] = useUserAtom()

  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  return useQuery({
    queryKey: [QUERY_KEY_HEAD, year, month, date],

    queryFn: async () => {
      return getPracticeItems({ currentUnix, userId: userAtom.userId }).then((items) => {
        const enrichedItems = items.map((item) => ({
          ...item,
          color: plans?.find((plan) => plan.title === item.title)?.color,
        }))

        return enrichedItems
      })
    },
    refetchOnMount: false,
    staleTime: 60 * 1000, // 1분, default 0
    enabled: !!userAtom.userId && !isLoading,
    refetchOnWindowFocus: false,
  })
}

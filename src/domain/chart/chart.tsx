import { useQuery } from '@tanstack/react-query'
import { CategoryItem } from '../category'
import { unixToYYYYMMDD } from '@/lib/utils'
import { useCalendarAtom } from '../calendar'
import { getDayChartItems } from '@/service/chart'
import { useUserStore } from '@/service/storeAdapter'

export type DayChartItem = Pick<CategoryItem, 'categoryId'> & {
  id: string
  minutes: number
  startTime: string // utc
}

const QUERY_KEY_HEAD = '@chart'
export function useChart({ categoryId }: { categoryId: string }) {
  const [currentUnix] = useCalendarAtom()

  const { user } = useUserStore()
  const { userId } = user

  const { year, month } = unixToYYYYMMDD(currentUnix)

  return useQuery({
    queryKey: [QUERY_KEY_HEAD, year, month, categoryId],
    queryFn: () => getDayChartItems({ userId, categoryId }),
    refetchOnMount: false,
    staleTime: 60 * 1000, // 1분, default 0
    enabled: !!userId && !!categoryId,
    refetchOnWindowFocus: false,
  })
}

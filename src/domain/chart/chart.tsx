import { useQuery } from '@tanstack/react-query'
import { CategoryItem } from '../category'
import { unixToYYYYMMDD } from '@/lib/utils'
import { getMonthlyPlanHistory } from '@/service/plan'

import { atom, useRecoilState } from 'recoil'
import { useCalendarAtom } from '../calendar'
import { useUserAtom } from '../user'
import { v1 } from 'uuid'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { getDayChartItems } from '@/service/chart'

export type DayChartItem = Pick<CategoryItem, 'categoryId'> & {
  id: string
  minutes: number
  startTime: string // utc
}

const QUERY_KEY_HEAD = '@chart'
export function useChart({ categoryId }: { categoryId: string }) {
  const [currentUnix] = useCalendarAtom()
  const [userAtom] = useUserAtom()
  const { userId } = userAtom

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

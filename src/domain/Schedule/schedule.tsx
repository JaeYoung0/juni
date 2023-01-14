import { unixToYYYYMMDD } from '@/lib/utils'
import { getScheduleItems } from '@/service/schedule'
import { useQuery } from '@tanstack/react-query'

import { useCalendarAtom } from '../calendar/calendar'
import { useUserAtom } from '../user'

export type ScheduleItem = {
  id: string
  title: string
  content: string
  startTime: number
  endTime: number
}

export function useScheduleQuery() {
  const [currentUnix] = useCalendarAtom()
  const [userAtom] = useUserAtom()

  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  return useQuery({
    queryKey: ['@schedule', year, month, date],
    queryFn: () => getScheduleItems({ currentUnix, userId: userAtom.userId }),
    refetchOnMount: false,
    staleTime: 60 * 1000, // 1분, default 0
    enabled: !!userAtom.userId,
  })
}

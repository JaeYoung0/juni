import { unixToYYYYMMDD } from '@/lib/utils'
import { getPracticeItems } from '@/service/practice'
import { useQuery } from '@tanstack/react-query'

import { useCalendarAtom } from '../calendar'
import { useUserAtom } from '../user'
export type PracticeItem = {
  id: string
  title: string // 일단 기존 타이틀에서 선택하게 만들자.
  content: string
  startTime: number
  endTime: number
}

export const QUERY_KEY_HEAD = '@practiceList'

export function usePracticeList() {
  const [currentUnix] = useCalendarAtom()
  const [userAtom] = useUserAtom()

  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  return useQuery({
    queryKey: [QUERY_KEY_HEAD, year, month, date],
    queryFn: () => getPracticeItems({ currentUnix, userId: userAtom.userId }),
    refetchOnMount: false,
    staleTime: 60 * 1000, // 1분, default 0
    enabled: !!userAtom.userId,
  })
}

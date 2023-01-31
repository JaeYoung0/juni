import { unixToYYYYMMDD } from '@/lib/utils'
import { getPracticeItems } from '@/service/practice'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'
import { useCalendarAtom } from '../calendar'
import { usePlanList } from '../plan'
import { useUserAtom } from '../user'

/**
 * @startTime - db에 utc로 저장
 * @endTime - db에 utc로 저장
 * @categoryId - categoryId가 비어있는("") practiceItem은 "계획에 없던 일" 아이템이다.
 */
export type PracticeItem = {
  id: string
  content: string
  startTime: string
  endTime: string
  categoryId: string
}

export const DEFAULT_PRACTICE_ATOM = {
  id: '',
  title: '',
  content: '',
  startTime: dayjs().utc().format(),
  endTime: dayjs().utc().format(),
  categoryId: '',
}

const PracticeItemAtom = atom<PracticeItem>({
  key: '@PracticeItem' + v1(),
  default: DEFAULT_PRACTICE_ATOM,
})

export function usePracticeItemAtom() {
  return useRecoilState(PracticeItemAtom)
}

export const QUERY_KEY_HEAD = '@practiceList'

export function usePracticeList() {
  const { data: plans, isLoading } = usePlanList()
  const [currentUnix] = useCalendarAtom()
  const [userAtom] = useUserAtom()

  const { year, month, date } = unixToYYYYMMDD(currentUnix)

  return useQuery({
    queryKey: [QUERY_KEY_HEAD, year, month, date],

    queryFn: async () => getPracticeItems({ currentUnix, userId: userAtom.userId }),
    refetchOnMount: false,
    staleTime: 60 * 1000, // 1분, default 0
    enabled: !!userAtom.userId && !isLoading,
    refetchOnWindowFocus: false,
  })
}

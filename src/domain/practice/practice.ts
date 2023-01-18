import { unixToYYYYMMDD } from '@/lib/utils'
import { getPracticeItems } from '@/service/practice'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { atom, useRecoilState } from 'recoil'
import { v1 } from 'uuid'
import { useCalendarAtom } from '../calendar'
import { usePlanList } from '../plan'
import { useUserAtom } from '../user'

export type PracticeItem = {
  id: string
  title: string
  content: string
  startTime: string | number // db에 utc로 저장 | 하루를 분으로 계산 (number)
  endTime: string | number // db에 utc로 저장 | 하루를 분으로 계산 (number)
  color: string // plan에 있는 color를 가져옴. practice db에는 저장하지 않음
}

export const DEFAULT_PRACTICE_ATOM = {
  id: '',
  title: '',
  content: '',
  startTime: dayjs().utc().format(),
  endTime: dayjs().utc().format(),
  color: '#aaa',
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

    queryFn: async () => {
      return getPracticeItems({ currentUnix, userId: userAtom.userId }).then((items) => {
        const enrichedItems = items.map((item) => ({
          ...item,
          color: plans?.find((plan) => plan.title === item.title)?.color ?? '#aaa',
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

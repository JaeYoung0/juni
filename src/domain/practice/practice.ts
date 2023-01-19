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
 * @startTime - db에 utc로 저장 | 하루를 분으로 계산 (number)
 * @endTime - db에 utc로 저장 | 하루를 분으로 계산 (number)
 * @categoryId - categoryId가 비어있는("") practiceItem은 "계획에 없던 일" 아이템이다.
 */
export type PracticeItem = {
  id: string
  title: string
  content: string
  startTime: string | number
  endTime: string | number
  categoryId: string // plan에 있는 정보를 가져옴. practice db에는 저장하지 않음 << 이 방식이 옳은가
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

    queryFn: async () => {
      return getPracticeItems({ currentUnix, userId: userAtom.userId }).then((items) => {
        const enrichedItems = items.map((item) => ({
          ...item,

          // plan과 practice의 title이 유니크하다고 가정하는게 옳은가
          categoryId: plans?.find((plan) => plan.title === item.title)?.categoryId ?? '',
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

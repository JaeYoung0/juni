import * as CS from '@/components/Dialogs/Plan/common.style'
import PracticeHeader from './PracticeHeader'
import PracticeBody from './PracticeBody'
import { DEFAULT_PRACTICE_ATOM, usePracticeItemAtom } from '@/domain/practice'
import { useCreatePracticeItem } from '@/service/practice'
import { BasicProps } from '@/hooks/useDialog'
import { useCalendarAtom } from '@/domain/calendar'
import dayjs from 'dayjs'
import { useUserStore } from '@/service/userAdapter'

type CreatePracticeDialogProps = BasicProps & { onClose?: () => void }

// TODO. CreatePlanDialog와 거의 동일
export default function CreatePracticeDialog({ close, onClose }: CreatePracticeDialogProps) {
  const [practiceItem, setPracticeItem] = usePracticeItemAtom()
  const [currentUnix] = useCalendarAtom()

  const { user } = useUserStore()
  const { userId } = user

  const createPracticeItem = useCreatePracticeItem()

  // 자정을 걸쳐서 제출하느라 잘라서 저장해야하는지 여부
  const shouldSplit =
    dayjs(practiceItem.startTime).get('d') !== dayjs(practiceItem.endTime).get('d')

  const createSplittedItems = () => {
    // 자르는 기준: 첫번째로 저장할 날의 23시 59분 59초
    const firstJunction = dayjs(practiceItem.startTime).endOf('d').utc().format()

    // 두번째로 저장할 날의 00:00:00
    const secondJunction = dayjs(firstJunction).add(1, 's').utc().format()

    createPracticeItem.mutate({
      currentUnix,
      ...practiceItem,
      endTime: firstJunction,
      userId,
    })

    createPracticeItem.mutate({
      currentUnix: dayjs.unix(currentUnix).add(1, 'd').unix(), // 다음날짜 캘린더에 저장하기 위함 (year, month, day 키를 바꿔주기)
      ...practiceItem,
      startTime: secondJunction,
      endTime: practiceItem.endTime,
      userId,
    })
  }

  const handleSubmit = () => {
    if (shouldSplit) {
      createSplittedItems()
    } else {
      createPracticeItem.mutate({
        currentUnix,
        ...practiceItem,
        userId,
      })
    }

    onClose?.()
    close()
  }

  const handleClose = () => {
    setPracticeItem(DEFAULT_PRACTICE_ATOM)
    close()
    onClose?.()
  }

  const ItemProps = { item: practiceItem, setItem: setPracticeItem }

  return (
    <>
      <CS.Dialog open>
        <CS.CloseButton onClick={handleClose}>X</CS.CloseButton>
        <CS.Wrapper>
          <PracticeHeader type="create" {...ItemProps} />
          <PracticeBody type="create" {...ItemProps} />
          <CS.ButtonsWrapper>
            <CS.Button onClick={handleSubmit}>추가</CS.Button>
          </CS.ButtonsWrapper>
        </CS.Wrapper>
      </CS.Dialog>
    </>
  )
}

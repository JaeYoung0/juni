import { useCalendarAtom } from '@/domain/calendar'
import { DEFAULT_PLAN_ATOM, usePlanItemAtom } from '@/domain/plan'
import { BasicProps } from '@/hooks/useDialog'
import { useCreatePlanItem } from '@/service/plan'
import * as CS from '../common.style'
import Header from './PlanHeader'
import Body from './PlanBody'
import dayjs from 'dayjs'
import { useUserStore } from '@/service/storeAdapter'

type CreatePlanDialogProps = BasicProps

function CreatePlanDialog({ close }: CreatePlanDialogProps) {
  const [planItem, setPlanItem] = usePlanItemAtom()
  const [currentUnix] = useCalendarAtom()

  const { user } = useUserStore()
  const { userId } = user

  const createPlanItem = useCreatePlanItem()

  const shouldSplit = dayjs(planItem.startTime).get('d') !== dayjs(planItem.endTime).get('d')

  const createSplittedItems = () => {
    // 자르는 기준: 첫번째로 저장할 날의 23시 59분 59초
    const firstJunction = dayjs(planItem.startTime).endOf('d').utc().format()

    // 두번째로 저장할 날의 00:00:00
    const secondJunction = dayjs(firstJunction).add(1, 's').utc().format()

    createPlanItem.mutate({
      currentUnix,
      ...planItem,
      endTime: firstJunction,
      userId,
    })

    createPlanItem.mutate({
      currentUnix: dayjs.unix(currentUnix).add(1, 'd').unix(), // 다음날짜 캘린더에 저장하기 위함 (year, month, day 키를 바꿔주기)
      ...planItem,
      startTime: secondJunction,
      endTime: planItem.endTime,
      userId,
    })
  }

  const handleSubmit = () => {
    if (shouldSplit) {
      createSplittedItems()
    } else {
      createPlanItem.mutate({
        currentUnix,
        ...planItem,
        userId,
      })
    }

    close()
  }

  const handleClose = () => {
    setPlanItem(DEFAULT_PLAN_ATOM)
    close()
  }

  const ItemProps = { item: planItem, setItem: setPlanItem }

  return (
    <>
      <CS.Dialog open>
        <CS.CloseButton onClick={handleClose}>X</CS.CloseButton>
        <CS.Wrapper>
          <Header {...ItemProps} />
          <Body {...ItemProps} />
          <CS.ButtonsWrapper>
            <CS.Button onClick={handleSubmit}>추가</CS.Button>
          </CS.ButtonsWrapper>
        </CS.Wrapper>
      </CS.Dialog>
    </>
  )
}

export default CreatePlanDialog

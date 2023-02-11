import { useCalendarAtom } from '@/domain/calendar'
import { DEFAULT_PLAN_ATOM, usePlanItemAtom } from '@/domain/plan'
import { DialogBasicProps } from '@/application/ports'
import { useCreatePlanItem } from '@/service/plan'
import * as DS from '../common.style'
import * as CS from '../../common.style'
import Header from './PlanHeader'
import Body from './PlanBody'
import dayjs from 'dayjs'
import { useUserStore } from '@/service/userAdapter'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { horizontalCentered } from '@/styles/cssProps'
import { css } from '@emotion/react'

type CreatePlanDialogProps = DialogBasicProps

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
      <DS.Dialog
        open
        css={css`
          background: #000;
        `}
      >
        <CS.Header>
          <button
            css={css`
              background: transparent;
              color: #fff;
            `}
            onClick={handleClose}
          >
            <ArrowBackIosNewIcon fontSize="large" />
          </button>
          <p
            css={css`
              ${horizontalCentered}
              font-size:1.6rem;
              color: #fff;
            `}
          >
            {planItem.id ? '[계획 수정]' : '[계획 추가]'}
          </p>
        </CS.Header>

        <DS.Wrapper>
          <Header {...ItemProps} />
          <Body {...ItemProps} />
          <DS.ButtonsWrapper>
            <DS.Button onClick={handleSubmit}>추가</DS.Button>
          </DS.ButtonsWrapper>
        </DS.Wrapper>
      </DS.Dialog>
    </>
  )
}

export default CreatePlanDialog

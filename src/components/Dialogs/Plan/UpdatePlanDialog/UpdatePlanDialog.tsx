import * as DS from '../common.style'
import * as CS from '../../common.style'
import PlanBody from '../CreatePlanDialog/PlanBody'
import PlanHeader from '../CreatePlanDialog/PlanHeader'
import { DialogBasicProps } from '@/application/ports'
import { DEFAULT_PLAN_ATOM, usePlanItemAtom } from '@/domain/plan'
import { useDeletePlanItem, useUpdatePlanItem } from '@/service/plan'
import { useCalendarAtom } from '@/domain/calendar'
import { useUserStore } from '@/service/userAdapter'
import { css } from '@emotion/react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { horizontalCentered } from '@/styles/cssProps'

type UpdatePlanDialogProps = DialogBasicProps

function UpdatePlanDialog({ close }: UpdatePlanDialogProps) {
  const [planItem, setPlanItem] = usePlanItemAtom()
  const [currentUnix] = useCalendarAtom()
  const { user } = useUserStore()
  const { userId } = user

  const updatePlanItem = useUpdatePlanItem()
  const handleSubmit = () => {
    updatePlanItem.mutate({
      currentUnix,
      ...planItem,
      userId,
    })
    close()
  }

  const deletePlanItem = useDeletePlanItem()
  const handleDelete = () => {
    void deletePlanItem.mutate({
      userId,
      currentUnix,
      id: planItem.id,
    })
    setPlanItem(DEFAULT_PLAN_ATOM)
    close()
  }

  const handleClose = () => {
    setPlanItem(DEFAULT_PLAN_ATOM)
    close()
  }

  const ItemProps = { item: planItem, setItem: setPlanItem }

  return (
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
        <PlanHeader {...ItemProps} />
        <PlanBody {...ItemProps} />
        <DS.ButtonsWrapper>
          <DS.Button onClick={handleDelete}>삭제</DS.Button>
          <DS.Button onClick={handleSubmit}>수정</DS.Button>
        </DS.ButtonsWrapper>
      </DS.Wrapper>
    </DS.Dialog>
  )
}

export default UpdatePlanDialog

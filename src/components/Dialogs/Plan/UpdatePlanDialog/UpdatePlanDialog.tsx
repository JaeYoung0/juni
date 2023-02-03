import * as CS from '../common.style'
import PlanBody from '../CreatePlanDialog/PlanBody'
import PlanHeader from '../CreatePlanDialog/PlanHeader'
import { BasicProps } from '@/hooks/useDialog'
import { DEFAULT_PLAN_ATOM, usePlanItemAtom } from '@/domain/plan'
import { useDeletePlanItem, useUpdatePlanItem } from '@/service/plan'
import { useCalendarAtom } from '@/domain/calendar'
import { useUserStore } from '@/service/userAdapter'

type UpdatePlanDialogProps = BasicProps

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
    <CS.Dialog open>
      <CS.CloseButton onClick={handleClose}>X</CS.CloseButton>
      <CS.Wrapper>
        <PlanHeader {...ItemProps} />
        <PlanBody {...ItemProps} />
        <CS.ButtonsWrapper>
          <CS.Button onClick={handleDelete}>삭제</CS.Button>
          <CS.Button onClick={handleSubmit}>수정</CS.Button>
        </CS.ButtonsWrapper>
      </CS.Wrapper>
    </CS.Dialog>
  )
}

export default UpdatePlanDialog

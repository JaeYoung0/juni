import * as CS from '../common.style'
import Body from '../CreatePlanDialog/Body'
import Header from '../CreatePlanDialog/Header'
import { BasicProps } from '@/hooks/useDialogList'
import { DEFAULT_PLAN_ATOM, usePlanItemAtom } from '@/domain/plan'
import { useDeletePlanItem, useUpdatePlanItem } from '@/service/plan'
import { useCalendarAtom } from '@/domain/calendar'
import { useUserAtom } from '@/domain/user'

type UpdatePlanDialogProps = BasicProps

function UpdatePlanDialog({ close }: UpdatePlanDialogProps) {
  const [planItem, setPlanItem] = usePlanItemAtom()
  const [currentUnix] = useCalendarAtom()
  const [userAtom] = useUserAtom()

  const updatePlanItem = useUpdatePlanItem()
  const handleSubmit = () => {
    updatePlanItem.mutate({
      currentUnix,
      ...planItem,
      userId: userAtom.userId,
    })
    close()
  }

  const deletePlanItem = useDeletePlanItem()
  const handleDelete = () => {
    void deletePlanItem.mutate({
      userId: userAtom.userId,
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
        <Header {...ItemProps} />
        <Body {...ItemProps} />
        <CS.ButtonsWrapper>
          <CS.Button onClick={handleDelete}>삭제</CS.Button>
          <CS.Button onClick={handleSubmit}>수정</CS.Button>
        </CS.ButtonsWrapper>
      </CS.Wrapper>
    </CS.Dialog>
  )
}

export default UpdatePlanDialog
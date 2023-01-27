import { useCalendarAtom } from '@/domain/calendar'
import { DEFAULT_PLAN_ATOM, usePlanItemAtom } from '@/domain/plan'
import { useUserAtom } from '@/domain/user'
import { BasicProps } from '@/hooks/useDialog'
import { useCreatePlanItem } from '@/service/plan'
import * as CS from '../common.style'
import Header from './PlanHeader'
import Body from './PlanBody'

type CreatePlanDialogProps = BasicProps

function CreatePlanDialog({ close }: CreatePlanDialogProps) {
  const [planItem, setPlanItem] = usePlanItemAtom()
  const [currentUnix] = useCalendarAtom()
  const [userAtom] = useUserAtom()

  const createPlanItem = useCreatePlanItem()
  const handleSubmit = () => {
    createPlanItem.mutate({
      currentUnix,
      ...planItem,
      userId: userAtom.userId,
    })
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

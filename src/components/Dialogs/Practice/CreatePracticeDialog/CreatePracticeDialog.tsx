import { useCalendarAtom } from '@/domain/calendar'
import { DEFAULT_PRACTICE_ATOM, usePracticeItemAtom } from '@/domain/practice'
import { useUserAtom } from '@/domain/user'
import { BasicProps } from '@/hooks/useDialogList'
import { useCreatePracticeItem } from '@/service/practice'
import * as CS from '@/components/Dialogs/Plan/common.style'
import Header from '@/components/Dialogs/Plan/CreatePlanDialog/Header'
import Body from '@/components/Dialogs/Plan/CreatePlanDialog/Body'

type CreatePracticeDialogProps = BasicProps

// TODO. CreatePlanDialog와 거의 동일
export default function CreatePracticeDialog({ close }: CreatePracticeDialogProps) {
  const [planItem, setPlanItem] = usePracticeItemAtom()
  const [currentUnix] = useCalendarAtom()
  const [userAtom] = useUserAtom()

  const createPracticeItem = useCreatePracticeItem()

  const handleSubmit = () => {
    createPracticeItem.mutate({
      currentUnix,
      ...planItem,
      userId: userAtom.userId,
    })
    close()
  }

  const handleClose = () => {
    setPlanItem(DEFAULT_PRACTICE_ATOM)
    close()
  }

  return (
    <>
      <CS.Dialog open>
        <CS.CloseButton onClick={handleClose}>X</CS.CloseButton>
        <CS.Wrapper>
          <Header />
          <Body />
          <CS.ButtonsWrapper>
            <CS.Button onClick={handleSubmit}>추가</CS.Button>
          </CS.ButtonsWrapper>
        </CS.Wrapper>
      </CS.Dialog>
    </>
  )
}

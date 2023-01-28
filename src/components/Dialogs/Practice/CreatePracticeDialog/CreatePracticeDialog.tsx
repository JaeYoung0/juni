import * as CS from '@/components/Dialogs/Plan/common.style'
import PracticeHeader from './PracticeHeader'
import PracticeBody from './PracticeBody'
import { DEFAULT_PRACTICE_ATOM, usePracticeItemAtom } from '@/domain/practice'
import { useCreatePracticeItem } from '@/service/practice'
import { useUserAtom } from '@/domain/user'
import { BasicProps } from '@/hooks/useDialog'
import { useCalendarAtom } from '@/domain/calendar'

type CreatePracticeDialogProps = BasicProps & { onClose?: () => void }

// TODO. CreatePlanDialog와 거의 동일

export default function CreatePracticeDialog({ close, onClose }: CreatePracticeDialogProps) {
  const [practiceItem, setPracticeItem] = usePracticeItemAtom()
  const [currentUnix] = useCalendarAtom()
  const [userAtom] = useUserAtom()

  const createPracticeItem = useCreatePracticeItem()

  const handleSubmit = () => {
    createPracticeItem.mutate({
      currentUnix,
      ...practiceItem,
      userId: userAtom.userId,
    })
    close()
    onClose?.()
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

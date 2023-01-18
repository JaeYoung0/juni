import * as CS from '@/components/Dialogs/Plan/common.style'
import Header from './Header'
import Body from './Body'
import { DEFAULT_PRACTICE_ATOM, usePracticeItemAtom } from '@/domain/practice'
import { useCreatePracticeItem } from '@/service/practice'
import { useUserAtom } from '@/domain/user'
import { BasicProps } from '@/hooks/useDialogList'
import { useCalendarAtom } from '@/domain/calendar'

type CreatePracticeDialogProps = BasicProps

// TODO. CreatePlanDialog와 거의 동일
export default function CreatePracticeDialog({ close }: CreatePracticeDialogProps) {
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
  }

  const handleClose = () => {
    setPracticeItem(DEFAULT_PRACTICE_ATOM)
    close()
  }

  const ItemProps = { item: practiceItem, setItem: setPracticeItem }

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

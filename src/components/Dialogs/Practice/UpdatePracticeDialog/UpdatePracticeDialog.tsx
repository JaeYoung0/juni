import * as CS from '@/components/Dialogs/Plan/common.style'
import Header from '../CreatePracticeDialog/Header'
import Body from '../CreatePracticeDialog/Body'
import { BasicProps } from '@/hooks/useDialogList'
import { DEFAULT_PRACTICE_ATOM, usePracticeItemAtom } from '@/domain/practice'
import { useUpdatePracticeItem, useDeletePracticeItem } from '@/service/practice'
import { useUserAtom } from '@/domain/user'
import { useCalendarAtom } from '@/domain/calendar'

type UpdatePracticeDialogProps = BasicProps

function UpdatePracticeDialog({ close }: UpdatePracticeDialogProps) {
  const [practiceItem, setPracticeItem] = usePracticeItemAtom()
  const [currentUnix] = useCalendarAtom()
  const [userAtom] = useUserAtom()

  const updatePracticeItem = useUpdatePracticeItem()
  const handleSubmit = () => {
    updatePracticeItem.mutate({
      currentUnix,
      ...practiceItem,
      userId: userAtom.userId,
    })
    close()
  }

  const deletePracticeItem = useDeletePracticeItem()
  const handleDelete = () => {
    void deletePracticeItem.mutate({
      userId: userAtom.userId,
      currentUnix,
      id: practiceItem.id,
    })
    setPracticeItem(DEFAULT_PRACTICE_ATOM)
    close()
  }

  const handleClose = () => {
    setPracticeItem(DEFAULT_PRACTICE_ATOM)
    close()
  }

  const ItemProps = { item: practiceItem, setItem: setPracticeItem }

  return (
    <CS.Dialog open>
      <CS.CloseButton onClick={handleClose}>X</CS.CloseButton>
      <CS.Wrapper>
        <Header {...ItemProps} />
        <Body type="update" {...ItemProps} />
        <CS.ButtonsWrapper>
          <CS.Button onClick={handleDelete}>삭제</CS.Button>
          <CS.Button onClick={handleSubmit}>수정</CS.Button>
        </CS.ButtonsWrapper>
      </CS.Wrapper>
    </CS.Dialog>
  )
}

export default UpdatePracticeDialog

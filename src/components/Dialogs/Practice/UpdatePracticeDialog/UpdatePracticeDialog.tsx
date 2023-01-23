import * as CS from '@/components/Dialogs/Plan/common.style'
import PracticeHeader from '../CreatePracticeDialog/PracticeHeader'
import PracticeBody from '../CreatePracticeDialog/PracticeBody'
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

  /**
   * 카테고리 필드가 db에 비어있는 상태인데, 카테고리를 채워서 보내면 카테고리가 생기지 않는다. updateDoc이기 때문.
   */
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
        <PracticeHeader type="update" {...ItemProps} />
        <PracticeBody type="update" {...ItemProps} />
        <CS.ButtonsWrapper>
          <CS.Button onClick={handleDelete}>삭제</CS.Button>
          <CS.Button onClick={handleSubmit}>수정</CS.Button>
        </CS.ButtonsWrapper>
      </CS.Wrapper>
    </CS.Dialog>
  )
}

export default UpdatePracticeDialog

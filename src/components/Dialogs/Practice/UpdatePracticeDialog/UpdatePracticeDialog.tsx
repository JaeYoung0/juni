import * as DS from '@/components/Dialogs/Plan/common.style'
import * as CS from '@/components/Dialogs/common.style'
import PracticeHeader from '../CreatePracticeDialog/PracticeHeader'
import PracticeBody from '../CreatePracticeDialog/PracticeBody'
import { DialogBasicProps } from '@/application/ports'
import { DEFAULT_PRACTICE_ATOM, usePracticeItemAtom } from '@/domain/practice'
import { useUpdatePracticeItem, useDeletePracticeItem } from '@/service/practice'
import { useCalendarAtom } from '@/domain/calendar'
import { useUserStore } from '@/service/userAdapter'
import { css } from '@emotion/react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { horizontalCentered } from '@/styles/cssProps'
type UpdatePracticeDialogProps = DialogBasicProps

function UpdatePracticeDialog({ close }: UpdatePracticeDialogProps) {
  const [practiceItem, setPracticeItem] = usePracticeItemAtom()
  const [currentUnix] = useCalendarAtom()

  const { user } = useUserStore()
  const { userId } = user

  const updatePracticeItem = useUpdatePracticeItem()

  /**
   * 카테고리 필드가 db에 비어있는 상태인데, 카테고리를 채워서 보내면 카테고리가 생기지 않는다. updateDoc이기 때문.
   */
  const handleSubmit = () => {
    updatePracticeItem.mutate({
      currentUnix,
      ...practiceItem,
      userId,
    })
    close()
  }

  const deletePracticeItem = useDeletePracticeItem()
  const handleDelete = () => {
    void deletePracticeItem.mutate({
      userId,
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
          {practiceItem.id ? '[계획 수정]' : '[계획 추가]'}
        </p>
      </CS.Header>
      <DS.Wrapper>
        <PracticeHeader type="update" {...ItemProps} />
        <PracticeBody type="update" {...ItemProps} />
        <DS.ButtonsWrapper>
          <DS.Button onClick={handleDelete}>삭제</DS.Button>
          <DS.Button onClick={handleSubmit}>수정</DS.Button>
        </DS.ButtonsWrapper>
      </DS.Wrapper>
    </DS.Dialog>
  )
}

export default UpdatePracticeDialog

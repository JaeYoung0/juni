import { DialogBasicProps } from '@/application/ports'
import { useAphorismStore } from '@/service/aphorismAdapter'
import useDialog from '@/service/dialogAdapter'
import { useUserStore } from '@/service/userAdapter'
import { css } from '@emotion/react'
import * as CS from '../common.style'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import AddCommentIcon from '@mui/icons-material/AddComment'
import * as S from './style'
import { Colors } from '@/styles/colors'
type Props = DialogBasicProps
function AphorismListDialog({ close }: Props) {
  const { aphorismList, deleteAphorismItem, saveCurrentAphorismItem } = useAphorismStore()
  const currentId = aphorismList?.find((item) => item.current)?.aphorismId

  const { user } = useUserStore()
  const { userId } = user

  const { openDialog } = useDialog()

  const handleClickText = (aphorismId: string) => {
    saveCurrentAphorismItem({
      userId,
      prevId: currentId ?? null,
      targetId: aphorismId,
    })
  }

  const handleDelete = (aphorismId: string) => deleteAphorismItem({ userId, aphorismId })

  return (
    <CS.Dialog open>
      <S.Header>
        <S.BackButton onClick={close}>
          <ArrowBackIosNewIcon fontSize="large" />
        </S.BackButton>
        <S.PlusButton
          onClick={() => {
            openDialog({ variant: 'CreateAphorismDialog', props: {} })
          }}
        >
          <AddCommentIcon fontSize="large" />
        </S.PlusButton>
      </S.Header>
      <S.ListBox>
        {aphorismList?.map(({ aphorismId, text, current }) => (
          <>
            <li key={aphorismId}>
              <S.AphorismText
                onClick={() => handleClickText(aphorismId)}
                css={css`
                  background: ${current ? Colors.Purple : Colors.Black};
                  border: ${!current && `1px solid ${Colors.Purple}`};
                `}
              >
                {text}
              </S.AphorismText>
              <S.Buttons>
                <button onClick={() => handleDelete(aphorismId)}>삭제</button>
              </S.Buttons>
            </li>
          </>
        ))}
      </S.ListBox>
    </CS.Dialog>
  )
}

export default AphorismListDialog

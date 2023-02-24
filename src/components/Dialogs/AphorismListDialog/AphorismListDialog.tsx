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

  const deleteItem = (aphorismId: string) => deleteAphorismItem({ userId, aphorismId })
  const handleClickDelete = async (aphorismId: string) => {
    const confirm = () =>
      new Promise((resolve) => {
        openDialog({
          variant: 'ActionDialog',
          props: {
            title: '삭제하시겠습니까?',
            content: '',
            cancelText: '취소',
            actionText: '확인',
            onAction: () => {
              resolve(true)
            },
          },
        })
      })

    const isConfirmed = await confirm()

    if (isConfirmed) {
      deleteItem(aphorismId)
    }
  }

  const handleClickPlus = () => {
    openDialog({ variant: 'CreateAphorismDialog', props: {} })
  }

  return (
    <CS.Dialog open>
      <CS.Header>
        <S.BackButton onClick={close}>
          <ArrowBackIosNewIcon fontSize="large" />
        </S.BackButton>
        <S.PlusButton onClick={handleClickPlus}>
          <AddCommentIcon fontSize="large" />
        </S.PlusButton>
      </CS.Header>
      <S.ListBox>
        {aphorismList?.length === 0 && (
          <S.NoticeText>오른쪽 위 아이콘을 클릭하여 문장을 추가해주세요.</S.NoticeText>
        )}
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
                <button onClick={() => handleClickDelete(aphorismId)}>삭제</button>
              </S.Buttons>
            </li>
          </>
        ))}
      </S.ListBox>
    </CS.Dialog>
  )
}

export default AphorismListDialog

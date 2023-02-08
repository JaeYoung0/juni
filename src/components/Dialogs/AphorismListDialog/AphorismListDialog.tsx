import { DialogBasicProps } from '@/application/ports'
import { useAphorismStore } from '@/service/aphorismAdapter'
import { useUserStore } from '@/service/userAdapter'
import { css } from '@emotion/react'
import { useState } from 'react'
import * as CS from '../common.style'

import * as S from './style'
type Props = DialogBasicProps
function AphorismListDialog({ close }: Props) {
  const { aphorismList, deleteAphorismItem, createAphorismItem, saveCurrentAphorismItem } =
    useAphorismStore()
  const currentId = aphorismList?.find((item) => item.current)?.aphorismId

  const { user } = useUserStore()
  const { userId } = user
  const [value, setvalue] = useState('')

  return (
    <CS.Dialog open>
      <S.BackButton onClick={close}>뒤로가기</S.BackButton>
      <S.ListBox>
        {aphorismList?.map(({ aphorismId, text, current }) => (
          <>
            <li key={aphorismId}>
              <input
                value={text}
                css={css`
                  background: ${current ? '#fff' : 'gray'};
                `}
              />
              <S.Buttons>
                <button
                  onClick={() => {
                    saveCurrentAphorismItem({
                      userId,
                      prevId: currentId ?? '',
                      targetId: aphorismId,
                    })
                  }}
                >
                  선택
                </button>
                <button>수정</button>
                <button
                  onClick={() => {
                    deleteAphorismItem({ userId, aphorismId })
                  }}
                >
                  삭제
                </button>
              </S.Buttons>
            </li>
          </>
        ))}
      </S.ListBox>

      <S.Form
        onSubmit={(e) => {
          e.preventDefault()
          if (!value) return
          createAphorismItem({ userId: user.userId, text: value, current: false })
          setvalue('')
        }}
      >
        <textarea
          value={value}
          onChange={(e) => {
            setvalue(e.target.value)
          }}
        />
        <button type="submit">생성하기</button>
      </S.Form>
    </CS.Dialog>
  )
}

export default AphorismListDialog

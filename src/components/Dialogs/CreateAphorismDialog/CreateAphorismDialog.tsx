import { useAphorismStore } from '@/service/aphorismAdapter'
import { useUserStore } from '@/service/userAdapter'
import { useState } from 'react'
import { DialogBasicProps } from '@/application/ports'
import * as S from './style'
import useFocus from '@/hooks/useFocus'
import { css } from '@emotion/react'
import * as CS from '../common.style'
import { horizontalCentered } from '@/styles/cssProps'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

type Props = DialogBasicProps
function CreateAphorismDialog({ close }: Props) {
  const [value, setvalue] = useState('')
  const { createAphorismItem } = useAphorismStore()

  const { user } = useUserStore()
  const callbackRef = useFocus()

  return (
    <>
      <CS.Dialog open>
        <CS.Header>
          <button
            css={css`
              background: transparent;
              color: #fff;
            `}
            onClick={close}
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
            문장 추가
          </p>
        </CS.Header>

        <S.Form
          onSubmit={(e) => {
            e.preventDefault()
            if (!value) return
            createAphorismItem({ userId: user.userId, text: value, current: false })
            setvalue('')
            close()
          }}
        >
          <textarea
            ref={callbackRef}
            value={value}
            onChange={(e) => {
              setvalue(e.target.value)
            }}
          />
          <S.Button type="submit">확인</S.Button>
        </S.Form>
      </CS.Dialog>
    </>
  )
}

export default CreateAphorismDialog

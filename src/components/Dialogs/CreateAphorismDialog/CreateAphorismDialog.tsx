import { useAphorismStore } from '@/service/aphorismAdapter'
import { useUserStore } from '@/service/userAdapter'
import { useState } from 'react'
import { DialogBasicProps } from '@/application/ports'
import * as S from './style'
import useFocus from '@/hooks/useFocus'

type Props = DialogBasicProps
function CreateAphorismDialog({ close }: Props) {
  const [value, setvalue] = useState('')
  const { createAphorismItem } = useAphorismStore()

  const { user } = useUserStore()
  const callbackRef = useFocus()

  return (
    <>
      <S.Overlay onClick={close} />
      <S.Dialog open>
        <S.Title>추가할 문장을 적어주세요 : )</S.Title>
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
      </S.Dialog>
    </>
  )
}

export default CreateAphorismDialog

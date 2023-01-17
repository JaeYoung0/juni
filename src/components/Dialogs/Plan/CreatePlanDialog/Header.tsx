import { usePlanItemAtom } from '@/domain/plan'
import useDialogList from '@/hooks/useDialogList'
import { css } from '@emotion/react'
import * as CS from '../common.style'

export default function Header() {
  const [planItemAtom, setPlanItemAtom] = usePlanItemAtom()
  const { openDialog } = useDialogList()

  return (
    <CS.DialogTitle>
      [스케줄 추가]
      <button
        type="button"
        css={css`
          background-color: ${planItemAtom.color};
          padding: 1rem;
        `}
        onClick={() => {
          // TODO. 이것도 prop으로 받아야할까?
          openDialog({
            variant: 'ColorPickerDialog',
            props: { onChangeColor: (color) => setPlanItemAtom({ ...planItemAtom, color }) }, // throttle?
          })
        }}
      >
        컬러픽
      </button>
    </CS.DialogTitle>
  )
}

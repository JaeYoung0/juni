import { PlanItem } from '@/domain/plan'
import { PracticeItem } from '@/domain/practice'
import useDialogList from '@/hooks/useDialogList'
import { css } from '@emotion/react'
import { SetterOrUpdater } from 'recoil'
import * as CS from '../common.style'

// BodyProps와 동일
type Props<T extends PlanItem | PracticeItem> = {
  item: T
  setItem: SetterOrUpdater<T>
}
export default function Header({ item, setItem }: Props<PlanItem | PracticeItem>) {
  const { openDialog } = useDialogList()

  return (
    <CS.DialogTitle>
      [스케줄 추가]
      <button
        type="button"
        css={css`
          background-color: ${item.color};
          padding: 1rem;
        `}
        onClick={() => {
          // TODO. 이것도 prop으로 받아야할까?
          openDialog({
            variant: 'ColorPickerDialog',
            props: { onChangeColor: (color) => setItem({ ...item, color }) }, // throttle?
          })
        }}
      >
        컬러픽
      </button>
    </CS.DialogTitle>
  )
}

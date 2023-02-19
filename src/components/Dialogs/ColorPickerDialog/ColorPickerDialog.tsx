import { DialogBasicProps } from '@/application/ports'
import { css } from '@emotion/react'
import { forwardRef } from 'react'
import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { COLOR_PICKERS } from './constant'
import * as S from './style'

type Props = DialogBasicProps & {
  onChange: React.ChangeEventHandler
  onBlur: React.FocusEventHandler
  name: string
  label: string
}

const ColorPickerDialog = forwardRef<HTMLInputElement, Props>(
  ({ close, onChange, onBlur, name, label }, ref) => {
    const [color, setColor] = useState('#aaa')

    return (
      <dialog open>
        <HexColorPicker
          css={css`
            width: 100%;
            margin-bottom: 2rem;
          `}
          color={color}
          onChange={setColor}
        />
        <Palette onClick={setColor} />
        <button
          css={css`
            width: 100%;
            padding: 0.5rem;
            margin-top: 1rem;
          `}
          onClick={close}
        >
          확인
        </button>
      </dialog>
    )
  }
)

export default ColorPickerDialog

type PaletteProps = {
  onClick: (color: string) => void
}
function Palette({ onClick }: PaletteProps) {
  return (
    <S.Palette>
      {COLOR_PICKERS.map((color) => (
        <S.PaletteItem
          key={color}
          onClick={() => onClick(color)}
          css={css`
            background: ${color};
          `}
        />
      ))}
    </S.Palette>
  )
}

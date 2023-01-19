import { BasicProps } from '@/hooks/useDialogList'
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { COLOR_PICKERS } from './constant'
import * as S from './style'

type Props = BasicProps & {
  onChangeColor?: (color: string) => void
}

function ColorPickerDialog({ onChangeColor, close }: Props) {
  const [color, setColor] = useState('#aaa')

  useEffect(() => {
    onChangeColor?.(color)
  }, [color])

  return (
    <dialog open>
      <HexColorPicker
        style={{ width: '100%', marginBottom: '2rem' }}
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

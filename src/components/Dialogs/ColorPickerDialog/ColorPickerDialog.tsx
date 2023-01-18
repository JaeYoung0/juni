import { BasicProps } from '@/hooks/useDialogList'
import { css } from '@emotion/react'
import React, { useState, useRef, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'

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
      <HexColorPicker color={color} onChange={setColor} />
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

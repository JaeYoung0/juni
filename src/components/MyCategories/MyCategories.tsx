import { useCategoryList } from '@/domain/category'
import useDialogList from '@/hooks/useDialogList'
import { css } from '@emotion/react'
import React from 'react'

interface Props {}

function MyCategories({}: Props) {
  const { data: categoryList } = useCategoryList()
  console.log('@@categoryList', categoryList)
  const { openDialog } = useDialogList()

  return (
    <div
      css={css`
        margin: 5rem 0rem;
      `}
    >
      <button
        onClick={() => {
          openDialog({
            variant: 'ColorPickerDialog',
            props: { onChangeColor: (color) => alert(color) },
          })
        }}
      >
        카테고리 생성하기
      </button>
    </div>
  )
}

export default MyCategories

import React, { forwardRef, useState } from 'react'
import { css } from '@emotion/react'
import { useCategoryStore } from '@/service/categoryAdapter'

type Props = {
  onChange: React.ChangeEventHandler
  name: string
}
const CategorySelector = forwardRef<HTMLSelectElement, Props>(({ onChange, name }, ref) => {
  const { categoryList } = useCategoryStore()

  return (
    <select
      ref={ref}
      css={css`
        padding: 1rem 2rem;
        option {
          background: lightcoral;
          color: #fff;
          padding: 3px 0;
          font-size: 16px;
        }
      `}
      name={name}
      onChange={onChange}
      autoComplete="off"
    >
      <option value="">카테고리</option>
      {categoryList?.map((item) => (
        <option key={item.categoryId} value={item.categoryId} style={{ background: item.color }}>
          {item.name}
        </option>
      ))}
    </select>
  )
})

export default CategorySelector

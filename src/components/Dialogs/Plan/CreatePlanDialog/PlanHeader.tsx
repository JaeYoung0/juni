import { PlanItem } from '@/domain/plan'
import { PracticeItem } from '@/domain/practice'
import useDialogList from '@/hooks/useDialogList'
import { SetterOrUpdater } from 'recoil'
import * as CS from '../common.style'

import { css } from '@emotion/react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useState } from 'react'
import { useCategoryList } from '@/domain/category'
import InputLabel from '@mui/material/InputLabel'

// BodyProps와 동일
type Props<T extends PlanItem | PracticeItem> = {
  item: T
  setItem: SetterOrUpdater<T>
}
export default function PlanHeader({ item, setItem }: Props<PlanItem | PracticeItem>) {
  const [categoryId, setCategoryId] = useState(item.categoryId)
  const { data: categoryList } = useCategoryList()
  const categoryOptions = categoryList?.map((item) => ({ id: item.id, color: item.color }))

  const current = categoryOptions?.find((item) => item.id === categoryId)
  const handleChange = (e: SelectChangeEvent) => {
    setCategoryId(e.target.value)
  }

  useEffect(() => {
    setItem({ ...item, categoryId })
  }, [current?.id])

  return (
    <CS.Header>
      <p>{item.id ? '[스케줄 수정]' : '[스케줄 추가]'}</p>
      <CS.Row
        css={css`
          display: flex;
        `}
      >
        <FormControl sx={{ minWidth: 100, background: current?.color }}>
          <InputLabel id="category-label">카테고리</InputLabel>

          {/* TODO. 카테고리는 비어있으면 안된다. validation 추가하기 */}
          <Select
            labelId="category-label"
            value={categoryId}
            onChange={handleChange}
            autoWidth
            label="Age"
          >
            {categoryList?.map((item) => (
              <MenuItem key={item.id} value={item.id} style={{ background: item.color }}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CS.Row>
    </CS.Header>
  )
}

import { PlanItem } from '@/domain/plan'
import { PracticeItem } from '@/domain/practice'
import { SetterOrUpdater } from 'recoil'
import * as CS from '@/components/Dialogs/Plan/common.style'
import { css } from '@emotion/react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useState } from 'react'
import { useCategoryStore } from '@/service/categoryAdapter'
import InputLabel from '@mui/material/InputLabel'

// BodyProps와 동일
type Props<T extends PlanItem | PracticeItem> = {
  item: T
  setItem: SetterOrUpdater<T>
  type: 'create' | 'update'
}
export default function PracticeHeader({ item, setItem, type }: Props<PlanItem | PracticeItem>) {
  const [categoryId, setCategoryId] = useState(item.categoryId)
  const { categoryList } = useCategoryStore()
  const categoryOptions = categoryList?.map((item) => ({ id: item.categoryId, color: item.color }))

  const current = categoryOptions?.find((item) => item.id === categoryId)
  const handleChange = (e: SelectChangeEvent) => {
    setCategoryId(e.target.value)
  }

  useEffect(() => {
    setItem({ ...item, categoryId })
  }, [current?.id])

  return (
    <CS.Header>
      <p>{type === 'update' ? `[스케줄 수정]` : `[스케줄 추가]`} </p>

      <CS.Row
        css={css`
          display: flex;
        `}
      >
        <FormControl sx={{ minWidth: 100, background: current?.color }}>
          <InputLabel id="category-label">카테고리</InputLabel>
          <Select
            disabled={type === 'update'}
            labelId="category-label"
            value={categoryId}
            onChange={handleChange}
            autoWidth
            label="Age"
          >
            {categoryList?.map((item) => (
              <MenuItem
                key={item.categoryId}
                value={item.categoryId}
                style={{ background: item.color }}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CS.Row>
    </CS.Header>
  )
}

import { CategoryItem } from '@/domain/category'
import { useChart } from '@/domain/chart'
import { useUserStore } from '@/service/userAdapter'
import useDialog from '@/service/dialogAdapter'
import { useCategoryStore } from '@/service/categoryAdapter'
import { css } from '@emotion/react'
import { useCallback, useState } from 'react'
import * as S from './style'
import useFocus from '@/hooks/useFocus'

interface Props {}

function MyCategories({}: Props) {
  const [color, setColor] = useState('#aaa')
  const [name, setName] = useState('')
  const { user } = useUserStore()
  const { userId } = user
  const { categoryList, createCategory } = useCategoryStore()

  const { openDialog } = useDialog()

  const handleClickColorPicker = () => {
    openDialog({
      variant: 'ColorPickerDialog',
      props: { onChangeColor: (color) => setColor(color) },
    })
  }

  const handleClickButton = () => {
    if (!name) return alert('카테고리 이름을 적어주세요.')
    createCategory({ name, color, userId })
  }

  // const callbackRef = useFocus()

  return (
    <S.Wrapper>
      <input
        // ref={callbackRef}
        placeholder="카테고리 이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        css={css`
          background: ${color};
        `}
        onClick={handleClickColorPicker}
      >
        컬러 선택
      </button>

      <button onClick={handleClickButton}>카테고리 생성하기</button>

      <S.CategroyList>
        <h2 css={css``}>내 카테고리 리스트</h2>
        {categoryList?.map((item) => (
          <CategoryItem key={item.categoryId} {...item} />
        ))}
      </S.CategroyList>
    </S.Wrapper>
  )
}

function CategoryItem({ name, color, categoryId }: CategoryItem) {
  const { user } = useUserStore()
  const { userId } = user
  const { data: chartList } = useChart({ categoryId })
  const { deleteCategory } = useCategoryStore()

  const deleteApplicable =
    !chartList?.plan.find((item) => item.categoryId === categoryId) &&
    !chartList?.practice.find((item) => item.categoryId === categoryId)

  const handleDelete = () => {
    const res = confirm('삭제하시겠어요?')
    if (res) {
      deleteCategory({
        categoryId: categoryId,
        userId,
      })
    }
  }

  return (
    <S.CategoryItem
      key={name}
      css={css`
        background: ${color};
      `}
    >
      <span>{name}</span>
      <button disabled={!deleteApplicable} onClick={handleDelete}>
        삭제
      </button>
    </S.CategoryItem>
  )
}

export default MyCategories

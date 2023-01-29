import { CategoryItem, useCategoryList } from '@/domain/category'
import { useChart } from '@/domain/chart'
import { useUserAtom } from '@/domain/user'
import useDialog from '@/hooks/useDialog'
import { useCreateCategoryItem, useDeleteCategoryItem } from '@/service/category'
import { css } from '@emotion/react'
import { useState } from 'react'
import * as S from './style'

interface Props {}

function MyCategories({}: Props) {
  const [color, setColor] = useState('#aaa')
  const [name, setName] = useState('')
  const [userAtom] = useUserAtom()
  const { data: categoryList } = useCategoryList()

  const { openDialog } = useDialog()
  const createCategoryItem = useCreateCategoryItem()

  const handleClickColorPicker = () => {
    openDialog({
      variant: 'ColorPickerDialog',
      props: { onChangeColor: (color) => setColor(color) },
    })
  }

  const handleClickButton = () =>
    createCategoryItem.mutate({ name, color, userId: userAtom.userId })

  return (
    <S.Wrapper>
      <input placeholder="카테고리 이름" value={name} onChange={(e) => setName(e.target.value)} />

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
  const [userAtom] = useUserAtom()
  const { data: chartList } = useChart({ categoryId })

  const deleteApplicable =
    !chartList?.plan.find((item) => item.categoryId === categoryId) &&
    !chartList?.practice.find((item) => item.categoryId === categoryId)

  const deleteCategoryItem = useDeleteCategoryItem()
  const handleDelete = () => {
    const res = confirm('삭제하시겠어요?')
    if (res) {
      deleteCategoryItem.mutate({
        categoryId: categoryId,
        userId: userAtom.userId,
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

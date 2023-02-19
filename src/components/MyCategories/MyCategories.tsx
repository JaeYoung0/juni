import { CategoryItem } from '@/domain/category'
import { useChart } from '@/domain/chart'
import { useUserStore } from '@/service/userAdapter'
import { useCategoryStore } from '@/service/categoryAdapter'
import { css } from '@emotion/react'
import * as S from './style'
import CategoryForm from './CategoryForm'
import useDialog from '@/service/dialogAdapter'

function MyCategories() {
  return (
    <S.Wrapper>
      <CategoryForm />
      <CategroyList />
    </S.Wrapper>
  )
}

function CategroyList() {
  const { categoryList } = useCategoryStore()

  return (
    <S.CategroyList>
      {categoryList?.map((item) => (
        <CategoryItem key={item.categoryId} {...item} />
      ))}
    </S.CategroyList>
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

  const { openDialog } = useDialog()

  return (
    <S.CategoryItem
      key={name}
      css={css`
        background: ${color};
      `}
    >
      <span>{name}</span>
      <button
        disabled={!deleteApplicable}
        onClick={async () => {
          const confirm = () =>
            new Promise((resolve) => {
              openDialog({
                variant: 'ActionDialog',
                props: {
                  title: '삭제하시겠습니까?',
                  content: '',
                  cancelText: '취소',
                  actionText: '확인',
                  onAction: () => {
                    resolve(true)
                  },
                },
              })
            })

          const isConfirmed = await confirm()

          if (isConfirmed) {
            deleteCategory({
              categoryId: categoryId,
              userId,
            })
          }
        }}
      >
        삭제
      </button>
    </S.CategoryItem>
  )
}

export default MyCategories

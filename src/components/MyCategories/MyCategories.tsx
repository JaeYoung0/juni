import { useCategoryList } from '@/domain/category'
import { useChart } from '@/domain/chart'
import { usePlanList } from '@/domain/plan'
import { usePracticeList } from '@/domain/practice'
import { useUserAtom } from '@/domain/user'
import useDialogList from '@/hooks/useDialogList'
import { useCreateCategoryItem, useDeleteCategoryItem } from '@/service/category'
import { css } from '@emotion/react'
import React, { useState } from 'react'

interface Props {}

function MyCategories({}: Props) {
  const { data: categoryList } = useCategoryList()
  const createCategoryItem = useCreateCategoryItem()
  const deleteCategoryItem = useDeleteCategoryItem()

  const { openDialog } = useDialogList()

  const [color, setColor] = useState('#aaa')
  const [userAtom] = useUserAtom()

  const [name, setName] = useState('')
  // const {data: ChartList} = useChart({categoryId})

  const { data: planList } = usePlanList()
  const { data: practiceList } = usePracticeList()

  // console.log('@@planList and practiceList', planList, practiceList)
  // TODO. Fix this ... 연월에 종속되지 않은 전체 planList, practiceList를 봐야함
  const cannotDelete = (id: string) => {
    return !!(
      planList?.find((item) => item.categoryId === id) ||
      practiceList?.find((item) => item.categoryId === id)
    )
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        margin: 5rem 0rem;

        input {
          width: 80%;
          margin: 0 auto;
          padding: 1rem 2rem;
        }

        button {
          padding: 0.5rem 1rem;
          width: 80%;
          margin: 0 auto;
        }

        row-gap: 2rem;
      `}
    >
      <input placeholder="카테고리 이름" value={name} onChange={(e) => setName(e.target.value)} />

      <button
        css={css`
          background: ${color};
        `}
        onClick={() => {
          openDialog({
            variant: 'ColorPickerDialog',
            props: { onChangeColor: (color) => setColor(color) },
          })
        }}
      >
        컬러 선택
      </button>

      <button
        onClick={() => {
          createCategoryItem.mutate({ name, color, userId: userAtom.userId })
        }}
      >
        카테고리 생성하기
      </button>

      <div>
        <h2
          css={css`
            font-size: 1.8rem;
            color: #fff;
            margin: 10rem auto 2rem;
          `}
        >
          내 카테고리 리스트
        </h2>
        {categoryList?.map((item) => (
          <div
            key={item.name}
            css={css`
              background: ${item.color};
              padding: 2rem;
              display: flex;
              justify-content: space-between;
              button {
                width: 10rem;
                margin: 0;
              }
            `}
          >
            <span>{item.name}</span>
            <button
              disabled
              onClick={() => {
                const res = confirm('삭제하시겠어요?')
                if (res) {
                  deleteCategoryItem.mutate({
                    categoryId: item.categoryId,
                    userId: userAtom.userId,
                  })
                }
              }}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyCategories

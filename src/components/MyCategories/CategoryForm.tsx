import { css } from '@emotion/react'
import { useCategoryStore } from '@/service/categoryAdapter'
import { useUserStore } from '@/service/userAdapter'
import { FieldValues, useForm } from 'react-hook-form'
import { Colors } from '@/styles/colors'

function CategoryForm() {
  const { user } = useUserStore()
  const { userId } = user

  const { createCategory } = useCategoryStore()

  const methods = useForm<{ name: string; color: string }>()
  const { errors } = methods.formState

  const onSubmit = (e: FieldValues) => {
    const { name, color } = e
    createCategory({ name, color, userId })
    methods.reset()
  }

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      css={css`
        & + section {
          margin-top: 5rem;
        }
      `}
    >
      <div
        css={css`
          display: flex;
        `}
      >
        <input
          type="text"
          placeholder="카테고리 이름"
          {...methods.register('name', { required: '카테고리 이름을 입력해주세요.' })}
          css={css`
            width: 100%;
            padding: 1rem;
          `}
        />

        <input
          type="color"
          {...methods.register('color', { required: true })}
          css={css`
            width: 5rem;
            height: auto;
          `}
        />
      </div>

      {errors.name && (
        <p
          css={css`
            font-size: 1.4rem;
            color: ${Colors.Purple};
            margin: 1rem 0rem;
          `}
        >
          {errors.name.message}
        </p>
      )}

      <button
        type="submit"
        css={css`
          width: 100%;
          padding: 1rem;
        `}
      >
        카테고리 생성하기
      </button>
    </form>
  )
}

export default CategoryForm

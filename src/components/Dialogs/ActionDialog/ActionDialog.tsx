import { DialogBasicProps } from '@/application/ports'
import { css } from '@emotion/react'

export type ActionDialogProps = DialogBasicProps & {
  title: string
  content: string
  cancelText: string
  actionText: string
  onAction: () => void
}

function ActionDialog(props: ActionDialogProps) {
  const { title, content, cancelText, actionText, close, onAction } = props

  return (
    <dialog
      open
      css={css`
        padding: 3rem 4rem;
      `}
    >
      <p
        css={css`
          font-size: 2rem;
          text-align: center;
          margin-bottom: 2rem;
        `}
      >
        {title}
      </p>
      <p
        css={css`
          font-size: 1.6rem;
        `}
      >
        {content}
      </p>
      <div
        css={css`
          display: flex;
          justify-content: space-around;
        `}
      >
        <button
          onClick={() => close()}
          css={css`
            padding: 1rem 2rem;
            color: #000;
          `}
        >
          {cancelText}
        </button>
        <button
          onClick={() => {
            onAction()
            close()
          }}
          css={css`
            padding: 1rem 2rem;
            color: #000;
          `}
        >
          {actionText}
        </button>
      </div>
    </dialog>
  )
}

export default ActionDialog

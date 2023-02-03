import useDialog from '@/service/dialogAdapter'
import * as Dialogs from '@/components/Dialogs'
import { css } from '@emotion/react'

function RootDialog() {
  const { dialogList, updateDialogList } = useDialog()

  return (
    <>
      {dialogList.map((dialogProps, idx) => {
        const Dialog = Dialogs[dialogProps.variant]

        const close = () => {
          // TODO. refactor
          const _dialogList = dialogList
          updateDialogList([..._dialogList].slice(0, _dialogList.length - 1))
        }

        // TODO. fix this
        return (
          <div
            key={idx}
            css={css`
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              min-height: calc(var(--vh) * 100);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 999;
            `}
          >
            <Dialog close={close} {...(dialogProps.props as any)} />
          </div>
        )
      })}
    </>
  )
}

export default RootDialog

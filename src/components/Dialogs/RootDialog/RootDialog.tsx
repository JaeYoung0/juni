import useDialogList from '@/hooks/useDialogList'
import * as Dialogs from '@/components/Dialogs'
import { css } from '@emotion/react'

function RootDialog() {
  const { dialogList, setDialogList } = useDialogList()

  return (
    <>
      {dialogList.map((dialogProps, idx) => {
        const Dialog = Dialogs[dialogProps.variant]

        const close = () => {
          // TODO. refactor
          const _dialogList = dialogList
          setDialogList([..._dialogList].slice(0, _dialogList.length - 1))
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
              backdrop-filter: blur(3px); ;
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

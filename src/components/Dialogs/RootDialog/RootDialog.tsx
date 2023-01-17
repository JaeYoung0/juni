import useDialogList from '@/hooks/useDialogList'
import * as Dialogs from '@/components/Dialogs'
import { css } from '@emotion/react'
import { Dayjs } from 'dayjs'

function RootDialog() {
  const { dialogList, setDialogList } = useDialogList()
  console.log('@@dialogList', dialogList)

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
              /* display: ${dialogList.length > 0 ? 'block' : 'none'}; */
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              min-height: calc(var(--vh) * 100);
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <Dialog
              // time={null}
              // handleChange={function (newValue: Dayjs | null): void {
              //   throw new Error('Function not implemented.')
              // }}
              title={''}
              content={''}
              cancelText={''}
              actionText={''}
              close={close}
              {...dialogProps.props}
            />
          </div>
        )
      })}
    </>
  )
}

export default RootDialog

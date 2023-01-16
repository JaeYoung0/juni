import useDialogList from '@/hooks/useDialogList'
import * as Dialogs from '@/components/Dialogs'

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
          <Dialog
            title={''}
            content={''}
            cancelText={''}
            actionText={''}
            close={close}
            key={idx}
            {...dialogProps.props}
          />
        )
      })}
    </>
  )
}

export default RootDialog

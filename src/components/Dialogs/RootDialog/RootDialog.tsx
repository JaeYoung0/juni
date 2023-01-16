import useDialogList from '@/hooks/useDialogList'
import * as dialogs from '@/components/Dialogs'

function RootDialog() {
  const { dialogList, setDialogList } = useDialogList()

  return (
    <>
      {dialogList.map((dialog, idx) => {
        const Dialog = dialogs[dialog.variant]

        const close = () => {
          // TODO. refactor
          const _dialogList = dialogList
          setDialogList([..._dialogList].slice(0, _dialogList.length - 1))
        }

        return <Dialog close={close} key={idx} {...dialog} />
      })}
    </>
  )
}

export default RootDialog

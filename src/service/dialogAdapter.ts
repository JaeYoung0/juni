import { useDialogListAtom } from './store'
import { DialogItem, DialogService, DialogVariant } from '@/application/ports'

/**
 * ref.current.close가 아니라 prop으로 전달받은 close로 닫을것
 */
export default function useDialog(): DialogService {
  const [dialogList, setDialogList] = useDialogListAtom()

  const openDialog = <T extends DialogVariant>(item: DialogItem<T>) =>
    setDialogList([...dialogList, item])

  const updateDialogList = (list: DialogItem<DialogVariant>[]) => setDialogList(list)

  return {
    openDialog,
    dialogList,
    updateDialogList,
  }
}

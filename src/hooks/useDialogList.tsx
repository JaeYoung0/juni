import { useRecoilState } from 'recoil'
import { atom } from 'recoil'
import { v1 } from 'uuid'
import * as dialogs from '@/components/Dialogs'

// TODO. dialog 상태는 도메인은 아닌데 ... 어디에 위치하는게 좋을까

export type BasicProps = {
  close: () => void

  title: string
  content: string
  cancelText: string
  actionText: string
}

type DialogType = keyof typeof dialogs
type DialogItem = {
  variant: DialogType
} & Omit<BasicProps, 'visible' | 'close'>

export const DialogListAtom = atom<DialogItem[]>({
  key: '@dialog' + v1(),
  default: [],
})

function useDialogListAtom() {
  return useRecoilState(DialogListAtom)
}

export default function useDialogList() {
  const [dialogList, setDialogList] = useDialogListAtom()
  const openDialog = (item: DialogItem) => setDialogList([...dialogList, item])

  return {
    openDialog,
    dialogList,
    setDialogList,
  }
}

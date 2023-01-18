import { useRecoilState } from 'recoil'
import { atom } from 'recoil'
import { v1 } from 'uuid'
import * as Dialogs from '@/components/Dialogs'

// TODO. dialog 상태는 도메인은 아닌데 ... 어디에 위치하는게 좋을까

/**
 * ref.current.close가 아니라 prop으로 전달받은 close로 닫을것
 */
export type BasicProps = {
  close: () => void
}

type DialogVariant = keyof typeof Dialogs
type Dialog = typeof Dialogs
type DialogProps<T extends DialogVariant> = React.ComponentProps<Dialog[T]>

type BasicPropKeys = keyof BasicProps

type DialogItem<V extends DialogVariant> = {
  variant: V
  props: Omit<DialogProps<V>, BasicPropKeys>
}

export const DialogListAtom = atom<DialogItem<DialogVariant>[]>({
  key: '@dialog' + v1(),
  default: [],
})

function useDialogListAtom() {
  return useRecoilState(DialogListAtom)
}

export default function useDialogList() {
  const [dialogList, setDialogList] = useDialogListAtom()

  // 구조만 타입정의한대로 맞아떨어진다면, 뒤쪽 T에 "ActionDialog"라고 들어가면 앞쪽 T에도 똑같이 할당된다.
  const openDialog = <T extends DialogVariant>(item: DialogItem<T>) =>
    setDialogList([...dialogList, item])

  return {
    openDialog,
    dialogList,
    setDialogList,
  }
}

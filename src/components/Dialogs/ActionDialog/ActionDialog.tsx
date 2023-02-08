import { DialogBasicProps } from '@/application/ports'

export type ActionDialogProps = DialogBasicProps & {
  title: string
  content: string
  cancelText: string
  actionText: string
}

function ActionDialog(props: ActionDialogProps) {
  const { title, content, cancelText, actionText, close } = props
  // const ref = useRef<HTMLDialogElement | null>(null)
  // const open = () => ref.current?.showModal()

  // useEffect(() => {
  //   !ref.current?.open ? open() : close()
  // }, [])

  return (
    // TODO. WithDialog로 뽑아내고 싶은데 잘 안됨
    <dialog open style={{ height: '200px' }}>
      <p>{title}</p>
      <p>{content}</p>
      <button onClick={() => close()}>{cancelText}</button>
      <button>{actionText}</button>
    </dialog>
  )
}

export default ActionDialog

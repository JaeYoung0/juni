import useDialog from '@/service/dialogAdapter'
import { PracticeItem, usePracticeItemAtom } from '@/domain/practice'
declare global {
  interface Window {
    isJuniNative: boolean
    ReactNativeWebView: {
      postMessage: (message: string) => void
    }
  }
}

type CreatePraticeDialogMessage = {
  source: 'juniNative'
  type: '@open/CreatePracticeDialog'
  payload: { startTime: string; endTime: string }
}

export type Message = WebviewMessage | OtherMessage

export type WebviewMessage = CreatePraticeDialogMessage

type OtherMessage = {
  source: string
}

export function isWebviewMessage(
  message: WebviewMessage | OtherMessage
): message is WebviewMessage {
  return (message as WebviewMessage).source === 'juniNative'
}

export default function useWebviewBridge() {
  const [practiceItem, setPracticeItem] = usePracticeItemAtom()

  const { openDialog } = useDialog()

  const openCreatePracticeDialog = ({
    startTime,
    endTime,
  }: Pick<PracticeItem, 'startTime' | 'endTime'>) => {
    setPracticeItem({ ...practiceItem, startTime, endTime })
    openDialog({ variant: 'CreatePracticeDialog', props: {} })
  }

  const openTimer = () => {
    window.ReactNativeWebView.postMessage('openTimer')
  }

  const handleMessage = (e: MessageEvent<Message>) => {
    if (!window.isJuniNative) return

    const data = e.data
    if (!isWebviewMessage(data)) return

    const { type, payload } = data
    if (type === '@open/CreatePracticeDialog') {
      const { startTime, endTime } = payload

      openCreatePracticeDialog({ startTime, endTime })
    }
  }
  return { openTimer, handleMessage }
}

import useDialog from '@/service/dialogAdapter'
import { PracticeItem, usePracticeItemAtom } from '@/domain/practice'
declare global {
  interface Window {
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

  const handleMessage = (e: MessageEvent<WebviewMessage>) => {
    if (e.data.source !== 'juniNative') return

    alert(JSON.stringify(e.data))

    if (e.data.type === '@open/CreatePracticeDialog') {
      const { startTime, endTime } = e.data.payload

      openCreatePracticeDialog({ startTime, endTime })
    }
  }
  return { openTimer, handleMessage }
}

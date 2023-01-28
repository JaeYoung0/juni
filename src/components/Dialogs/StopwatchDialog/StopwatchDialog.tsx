import { useRef, useState } from 'react'
import TimerView from './TimerView'
import styled from '@emotion/styled'
import useDialog, { BasicProps } from '@/hooks/useDialog'
import { Colors } from '@/styles/colors'
import { usePracticeItemAtom } from '@/domain/practice'
import dayjs from 'dayjs'

const intervalTimer = (update: (time: number) => void, interval = 1000) => {
  let counter = 1
  let timeoutId = 0
  const startTime = Date.now()

  function main() {
    const mainThreadTime = Date.now() // 이벤트루프 다녀오고나서 콜스택에 올라오고 실제로 실행된 시각
    const nextTime = startTime + counter * interval // 오차없이 실행되어야할 시각
    const deviation = mainThreadTime - nextTime // 이벤트루프 다녀오느라 걸린 시간
    const compensatedInterval = interval - deviation // 보정
    timeoutId = window.setTimeout(main, compensatedInterval)

    counter += 1
    update(mainThreadTime - startTime - deviation)
  }

  window.setTimeout(main, interval)

  return () => clearTimeout(timeoutId)
}

type Props = BasicProps

function StopwatchDialog({ close }: Props) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [paused, setPaused] = useState(false)
  const [practiceItem, setPracticeItem] = usePracticeItemAtom()
  console.log('@@paused', paused)

  const timerController = useRef<{ clear: () => void }>({
    clear: () => 0,
  })

  const handleStart = () => {
    timerController.current.clear = intervalTimer((time) => setElapsedTime(time))
    setPracticeItem({ ...practiceItem, startTime: dayjs().utc().format() })
  }

  const handlePause = () => {
    setPaused(true)
    timerController.current.clear()
  }

  const handleContinue = () => {
    setPaused(false)
    timerController.current.clear = intervalTimer((time) => setElapsedTime(elapsedTime + time))
  }

  const { openDialog } = useDialog()

  const handleStop = () => {
    timerController.current.clear()
    setElapsedTime(0)
    setPracticeItem({ ...practiceItem, endTime: dayjs().utc().format() })
    openDialog({ variant: 'CreatePracticeDialog', props: { onClose: close } })
    // close() // 왜 여기 넣으면 안되는걸까?
  }

  const isTicking = elapsedTime !== 0

  const ItemProps = { item: practiceItem, setItem: setPracticeItem }

  return (
    <Dialog open>
      <TimerView time={elapsedTime} />
      <Buttons>
        {!isTicking && <button onClick={handleStart}>시작</button>}
        {/* {isTicking && !paused && <button onClick={handlePause}>일시정지</button>} */}
        {isTicking && paused && <button onClick={handleContinue}>계속하기</button>}
        {isTicking && <button onClick={handleStop}>종료</button>}
      </Buttons>
    </Dialog>
  )
}

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;

  button {
    padding: 1rem 2rem;
    background: #fff;
    border: 1px solid ${Colors.Gray};
  }
`

const Dialog = styled.dialog`
  width: 100%;
  padding: 3rem;
`

export default StopwatchDialog

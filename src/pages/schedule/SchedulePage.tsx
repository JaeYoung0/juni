import * as S from './style'
import Calendar from '@/components/Calendar'
import ScheduleGrid from '@/components/ScheduleGrid'
import { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useCalendarAtom } from '@/domain/calendar'
import BasicLayout from '@/components/layouts/BasicLayout'
import { TODAY_UNIX } from '@/components/Calendar/CalendarView'
import withAuth from '@/hoc/withAuth'
import { css } from '@emotion/react'
import useDialog from '@/service/dialogAdapter'
import { usePracticeItemAtom } from '@/domain/practice'

type BridgeMessage = {
  from: 'JuniNative'
  method: string
  payload: any
}

type PostTimerResultMessage = {
  from: 'JuniNative'
  method: 'postTimerResult'
  payload: {
    startTime: string
    endTime: string
  }
}

function SchedulePage() {
  // TODO. refactor: calendarAtom 위치
  const [_, setCurrentUnix] = useCalendarAtom()

  useEffect(() => {
    setCurrentUnix(TODAY_UNIX)
  }, [])

  const [practiceItem, setPracticeItem] = usePracticeItemAtom()

  const { openDialog } = useDialog()

  useEffect(() => {
    const handleMessage = (e: MessageEvent<string>) => {
      // TODO. RN에서 보내는 메시지 ... window.isJuniNative로 판별하기
      if (typeof e.data !== 'string') return

      const data = JSON.parse(e.data) as PostTimerResultMessage
      const { startTime, endTime } = data.payload
      setPracticeItem({ ...practiceItem, startTime, endTime })
      openDialog({ variant: 'CreatePracticeDialog', props: {} })
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <BasicLayout>
      <S.Box>
        <div
          css={css`
            position: sticky;
            top: 0;
            z-index: 500;
          `}
        >
          <ToggledCalendar />
        </div>
        <ScheduleGrid />
      </S.Box>
    </BasicLayout>
  )
}

function ToggledCalendar() {
  const [showCalendar, setShowCalendar] = useState(true)
  return (
    <S.CalendarWrapper>
      <S.ToggleButton onClick={() => setShowCalendar(!showCalendar)}>
        <span>Calendar</span>
        {showCalendar ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon />}
      </S.ToggleButton>
      {showCalendar && <Calendar />}
    </S.CalendarWrapper>
  )
}

export default withAuth(SchedulePage)

import * as S from './style'
import Calendar from '@/components/Calendar'
import ScheduleGrid from '@/components/ScheduleGrid'
import { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useCalendarAtom } from '@/domain/calendar'
import BasicLayout from '@/components/layouts/BasicLayout'
import { TODAY_UNIX } from '@/components/Calendar/CalendarView'
import withAuth from '@/application/withAuth'
import { css } from '@emotion/react'

function SchedulePage() {
  // TODO. refactor: calendarAtom 위치
  const [_, setCurrentUnix] = useCalendarAtom()

  useEffect(() => {
    setCurrentUnix(TODAY_UNIX)
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

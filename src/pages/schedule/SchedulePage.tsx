import * as S from './style'
import Calendar from '@/components/Calendar'
import ScheduleGrid from '@/components/ScheduleGrid'
import { useEffect } from 'react'
import { useCalendarAtom } from '@/domain/calendar'
import BasicLayout from '@/components/layouts/BasicLayout'
import { TODAY_UNIX } from '@/components/Calendar/CalendarView'
import withAuth from '@/hoc/withAuth'
import useWebviewBridge from '@/lib/bridge'

function SchedulePage() {
  // TODO. refactor: calendarAtom 위치
  const [_, setCurrentUnix] = useCalendarAtom()

  useEffect(() => {
    setCurrentUnix(TODAY_UNIX)
  }, [])

  const { handleMessage } = useWebviewBridge()

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <BasicLayout>
      <S.Box>
        <S.CalendarWrapper>
          <Calendar />
        </S.CalendarWrapper>
        <ScheduleGrid />
      </S.Box>
    </BasicLayout>
  )
}

export default withAuth(SchedulePage)

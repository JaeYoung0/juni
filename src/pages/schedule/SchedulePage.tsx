import * as S from './style'
import Calendar from '@/components/Calendar'
import ScheduleGrid from '@/components/ScheduleGrid'
import { useEffect, useState } from 'react'
import { useUserAtom } from '@/domain/user'
import { firebaseAuth, useAuth } from '@/service/auth'
import { useRouter } from 'next/router'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useCalendarAtom } from '@/domain/calendar'
import dayjs from 'dayjs'
import BasicLayout from '@/components/layouts/BasicLayout'
import useDialogList from '@/hooks/useDialogList'
import { TODAY_UNIX } from '@/components/Calendar/CalendarView'
import BottomNavigation from '@/components/BottomNavigation'

export default function SchedulePage() {
  const [userAtom, setUserAtom] = useUserAtom()
  const router = useRouter()

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        void router.replace('/login')
      } else {
        const { uid, displayName } = user

        // 이걸 _app.tsx로 뺄 수 없다. HOC로 만들면?
        setUserAtom({
          userId: uid,
          name: displayName ?? '이름 없음',
        })
        // Home에서는 ui비워놓고 auth check만 할까?
        // void router.replace('/schedule')
      }
    })
  }, [])

  // TODO. refactor: calendarAtom 위치
  const [currentUnix, setCurrentUnix] = useCalendarAtom()

  useEffect(() => {
    setCurrentUnix(TODAY_UNIX)
  }, [])

  return (
    <BasicLayout>
      <S.Box>
        <ToggledCalendar />
        <ScheduleGrid />
      </S.Box>
    </BasicLayout>
  )
}

function ToggledCalendar() {
  const [showCalendar, setShowCalendar] = useState(false)
  return (
    <>
      <S.ToggleButton onClick={() => setShowCalendar(!showCalendar)}>
        {/* <CalendarMonthIcon /> */}
        <span>Calendar</span>
        {showCalendar ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon />}
      </S.ToggleButton>
      {showCalendar && <Calendar />}
    </>
  )
}

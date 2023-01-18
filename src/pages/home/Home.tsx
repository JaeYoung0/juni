import * as S from './Home.style'
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

function Home() {
  const [userAtom, setUserAtom] = useUserAtom()
  const router = useRouter()
  const { logout } = useAuth()
  const handleClickButton = () => void logout()

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        void router.replace('/login')
      } else {
        const { uid, displayName } = user
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
      <S.UserName>
        {userAtom.name}님 안녕하세요! <button onClick={handleClickButton}>로그아웃</button>
      </S.UserName>
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

export default Home

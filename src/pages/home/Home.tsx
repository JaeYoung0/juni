import * as S from './Home.style'
import Calendar from '@/components/Calendar'
import TodayGrid from '@/components/TodayGrid'
import { useEffect, useState } from 'react'
import { useUserAtom } from '@/domain/user'
import { firebaseAuth, useAuth } from '@/service/auth'
import { useRouter } from 'next/router'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useCalendarAtom } from '@/domain/calendar'
import dayjs from 'dayjs'

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
      }
    })
  }, [])

  const [showCalendar, setShowCalendar] = useState(false)

  // TODO. refactor: calendarAtom 위치
  const [_, setCurrentUnix] = useCalendarAtom()
  useEffect(() => {
    setCurrentUnix(dayjs().unix())
  }, [])

  return (
    <S.Container>
      <S.Box>
        <S.UserName>
          {userAtom.name}님 안녕하세요! <button onClick={handleClickButton}>로그아웃</button>
        </S.UserName>

        <S.ToggleButton onClick={() => setShowCalendar(!showCalendar)}>
          <CalendarMonthIcon />
          {showCalendar ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </S.ToggleButton>
        {showCalendar && <Calendar />}

        <TodayGrid />
      </S.Box>
    </S.Container>
  )
}

export default Home

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
        // Home에서는 auth check만 하자.
        // void router.replace('/schedule')
      }
    })
  }, [])

  // TODO. refactor: calendarAtom 위치
  const [_, setCurrentUnix] = useCalendarAtom()
  useEffect(() => {
    setCurrentUnix(dayjs().unix())
  }, [])

  const { openDialog } = useDialogList()

  return (
    <BasicLayout>
      <S.UserName>
        {userAtom.name}님 안녕하세요! <button onClick={handleClickButton}>로그아웃</button>
        <button
          onClick={() => {
            openDialog({
              variant: 'ActionDialg',
              title: 'wow',
              content: 'ㅁㄴㅇㅁㄴㅇ',
              cancelText: '취소',
              actionText: '확인',
            })
          }}
        >
          test
        </button>
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
        <CalendarMonthIcon />
        {showCalendar ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </S.ToggleButton>
      {showCalendar && <Calendar />}
    </>
  )
}

export default Home

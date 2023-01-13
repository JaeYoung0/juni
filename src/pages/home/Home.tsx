import * as S from './Home.style'
import Calendar from '@/components/Calendar'
import TodayGrid from '@/components/TodayGrid'
import { useEffect } from 'react'
import { ScheduleItem, useScheduleAtomState } from '@/domain/Schedule/schedule'

function Home() {
  const [_, setScheduleAtom] = useScheduleAtomState()
  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('@schedule') ?? '[]') as ScheduleItem[]
    setScheduleAtom(results)
  }, [])
  return (
    <S.Container>
      <S.Box>
        <Calendar />
        <TodayGrid />
      </S.Box>
    </S.Container>
  )
}

export default Home

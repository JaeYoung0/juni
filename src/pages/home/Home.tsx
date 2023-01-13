import * as S from './Home.style'
import { css } from '@emotion/react'
import Calendar from '@/components/Calendar'
import TodayGrid from '@/components/TodayGrid'
import { useCalendarAtomState } from '@/domain/Calendar/calendar'
import dayjs from 'dayjs'

function Home() {
  const [calendarAtom] = useCalendarAtomState()
  console.log('@@calendarAtom', dayjs.unix(calendarAtom).format('YYYY-MM-DD'))

  return (
    <S.Container>
      Home
      <h1
        css={css`
          color: white;
        `}
      >
        <S.CalendarBox>
          <Calendar />
          <TodayGrid />
        </S.CalendarBox>
      </h1>
    </S.Container>
  )
}

export default Home

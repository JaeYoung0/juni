import * as S from './Home.style'
import { css } from '@emotion/react'
import Calendar from '@/components/Calendar/Calendar'
import TodayGrid from '@/components/TodayGrid/TodayGrid'

function Home() {
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

import * as S from './Home.style'
import { css } from '@emotion/react'
import Calendar from '@/components/Calendar'
import TodayGrid from '@/components/TodayGrid'

function Home() {
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

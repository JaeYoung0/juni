import * as S from './Home.style'
import { css } from '@emotion/react'

function Home() {
  return (
    <S.Container>
      Home
      <h1
        css={css`
          color: white;
        `}
      >
        Home
      </h1>
    </S.Container>
  )
}

export default Home

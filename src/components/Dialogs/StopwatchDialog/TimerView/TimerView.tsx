import styled from '@emotion/styled'

type Props = {
  time: number // 경과시간이 밀리세컨드 단위로 넘어옴
}

function TimerView({ time }: Props) {
  const seconds = time / 1000
  const ss = Math.floor(seconds % 60)
  const mm = Math.floor((seconds % 3600) / 60)
  const hh = Math.floor(seconds / 3600)
  const format = (n: number) => n.toString().padStart(2, '0')

  return (
    <Container>
      <HH>{format(hh)}</HH>
      <Colon>{` : `}</Colon>
      <MM>{format(mm)}</MM>
      <Colon>{` : `}</Colon>
      <SS>{format(ss)}</SS>
    </Container>
  )
}

export default TimerView

const Container = styled.div`
  position: relative;
  text-align: center;

  span {
    font-size: 5rem;
  }

  margin-bottom: 2rem;
`

// TODO. 숫자가 움찔하는건 어떻게 막을까 ...
const HH = styled.span``
const MM = styled.span``
const SS = styled.span``
const Colon = styled.span``

import styled from '@emotion/styled'

export const ScrollSnapContainer = styled.div`
  display: flex;

  width: 100%;
  scroll-snap-type: x mandatory;
  overflow: auto;
`

export const ScrollSnapItem = styled.div`
  flex: none; // 자식요소 크기 고정!

  width: 100%;
  height: 5rem;
  scroll-snap-type: x mandatory;
  scroll-snap-stop: always;
  scroll-snap-align: center;
  background: #222;
  color: #fff;

  display: flex;
`

export const Date = styled.div`
  width: 100%;
  text-align: center;
`

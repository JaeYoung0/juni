import { Colors } from '@/styles/colors'
import styled from '@emotion/styled'

export const Dial = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 10rem;

  width: 4rem;
  height: 4rem;
  background: ${Colors.Purple};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  cursor: pointer;

  svg {
    font-size: 2.2rem;
  }
`

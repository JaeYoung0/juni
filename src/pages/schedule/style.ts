import styled from '@emotion/styled'
import { Colors } from '@/styles/colors'

export const Box = styled.div`
  width: 100%;
  height: 100%;
  max-width: 60rem;
  margin: 0 auto;
`

export const ToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem 2rem;
  background: #000;
  color: ${Colors.Gray};

  svg {
    width: 2rem;
    height: 2rem;
  }

  span {
    font-size: 2rem;
  }
`

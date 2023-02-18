import styled from '@emotion/styled'
import { Colors } from '@/styles/colors'

export const Box = styled.div`
  width: 100%;
  height: 100%;
  max-width: 60rem;
  margin: 0 auto;
  margin-bottom: 15rem;
`

export const ToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

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

export const CalendarWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 500;
`

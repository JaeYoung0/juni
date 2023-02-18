import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Colors } from '@/styles/colors'
const CALENDAR_COLOR = Colors.Black

export const Container = styled.div`
  width: 100%;
  touch-action: none; // 패닝, 줌 동작을 막는다
`

export const CalendarBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.6rem;
  color: #fff;
  background: ${CALENDAR_COLOR};

  padding: 1rem 1rem 2rem;
`

export const HeaderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 1.5rem 0;

  button {
    background: transparent;
  }

  svg {
    color: #fff;
  }
`

export const DaysBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  font-size: 0.8rem;
  color: gray;

  margin-bottom: 1rem;
`

export const Day = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
`

export const DatesBox = styled.div``

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  margin: 0.3rem 0;
`

export const Cell = styled.button<{ isToday: boolean; isSelected: boolean; notThisMonth: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: 1;

  color: #fff;
  background: ${CALENDAR_COLOR};

  margin: 0 0.3rem;
  transition: 0.2s ease-out;

  ${({ isSelected }) =>
    isSelected &&
    css`
      background: #969696;
    `}

  ${({ isToday }) =>
    isToday &&
    css`
      background: #7755ff;
    `}

    ${({ notThisMonth }) =>
    notThisMonth &&
    css`
      color: #aaa;
    `}
`

export const HelperBox = styled.div`
  width: 100%;
  height: 100%;

  max-width: 10rem;
  background: #2f2f2f;
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    background: #2f2f2f;
    color: #fff;

    padding: 0.5rem;

    &:hover {
      background: #000;
    }
  }
`

import { css } from '@emotion/react'
import styled from '@emotion/styled'

// TODO Error: Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.
/* div > ${Time}{
} */

const cellStyle = css`
  width: 100%;
  min-height: 100px;
  background: #222222;
`

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3fr 3fr;
  padding: 0rem 0rem 5rem;

  color: #fff;

  div > div {
    border-right: 1px solid #aaa;
  }

  div:first-of-type > div {
    border-bottom: none;
  }
  div:not(:first-of-type) > div {
    border-top: 1px solid #aaa;
  }
  div:not(:first-of-type) > div {
    border-bottom: 1px solid #aaa;
  }
`

export const VacantArea = styled.div`
  height: 3rem;
  background: #222222;
`

export const CurrentDateTime = styled.h2`
  color: #fff;
  font-size: 1.8rem;
  text-align: center;
  padding: 2rem 0rem;
`

export const Times = styled.div``

export const Time = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;

  span {
    transform: translateY(-50%);
    font-size: 1.4rem;
  }

  ${cellStyle}
`

export const Plans = styled.div`
  position: relative;
`

export const Plan = styled.div`
  ${cellStyle}
`

export const Schedules = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const ScheduleItem = styled.div<{ top: number; height: number }>`
  position: absolute;
  top: ${({ top }) => `${top}%`};
  height: ${({ height }) => `${height}%`};

  left: 0;
  z-index: 100;

  ${cellStyle}
  background: gray;
  white-space: pre;
  font-size: 1rem;
  line-height: 1.5;
`

export const Reals = styled.div``

export const RealItem = styled.div`
  ${cellStyle}
`

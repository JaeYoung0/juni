import { css } from '@emotion/react'
import styled from '@emotion/styled'

// TODO Error: Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.
/* div > ${Time}{
} */

const baseCellStyle = css`
  width: 100%;
  background: #222222;
  min-height: 100px;
`

const planCellStyle = css`
  width: 100%;
  background: #222222;
`

export const Grid = styled.div`
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

export const CurrentUnix = styled.h2`
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

  ${baseCellStyle}
`

export const Plans = styled.div`
  position: relative;
`

export const Plan = styled.div`
  ${baseCellStyle}
`

export const PlanItem = styled.div<{ top: number; height: number }>`
  position: absolute;
  top: ${({ top }) => `${top}%`};
  height: ${({ height }) => `${height}%`};

  left: 0;
  z-index: 100;

  ${planCellStyle}
  background: gray;

  font-size: 1rem;
  line-height: 1.5;

  font-size: 1.4rem;
  padding: 1rem;

  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
`

export const PracticeItem = styled(PlanItem)``

export const PracticeList = styled.div`
  position: relative;
`

export const PracticeBaseCell = styled.div`
  ${baseCellStyle}
`

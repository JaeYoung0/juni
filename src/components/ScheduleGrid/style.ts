import { Colors } from '@/styles/colors'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

// TODO Error: Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.
/* div > ${Time}{
} */

const CELL_HEIGHT = '10rem'

const baseCellStyle = css`
  width: 100%;
  background: #000;
  min-height: 100px;
`

const planCellStyle = css`
  width: 100%;
  background: #000;
`
export const GridWrapper = styled.div<{ firstHour: number }>`
  overflow: hidden;
  background: #000;
  height: ${({ firstHour }) =>
    `calc((24 - ${firstHour}) * ${CELL_HEIGHT})`}; // 9시부터 시작인 시간표라면, 24-9 - 13에다가 각 셀의 높이인 10rem을 곱한다
`
export const Grid = styled.div<{ firstHour: number }>`
  position: relative;
  display: grid;
  grid-template-columns: 7fr 1fr 7fr;
  padding: 0rem 0rem 5rem;
  background: #222;

  color: #fff;

  div:not(:nth-of-type(2)) > div {
    border-top: 1px solid ${Colors.Gray};
  }

  div > div {
    /* border-right: 1px solid #aaa; */
  }

  div:first-of-type > div {
    /* border-bottom: none; */
  }
  div:not(:first-of-type) > div {
    /* border-top: 1px solid #aaa; */
  }
  div:not(:first-of-type) > div {
    /* border-bottom: 1px solid #aaa; */
  }

  transform: ${({ firstHour }) =>
    firstHour ? `translateY(calc((-${firstHour} / 24) * 100% + 5rem));` : `translateY(3rem)`};
`

export const CurrentUnix = styled.h2`
  color: #fff;
  font-size: 1.6rem;
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
    color: ${Colors.Gray};
  }

  ${baseCellStyle}
`

export const Plans = styled.div`
  position: relative;

  &::before {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    transform: translate3d(0, -160%, 0);
    color: ${Colors.Gray};
    font-size: 1.4rem;
    content: 'Plan';
    text-align: center;
  }
`

export const PlanBaseCell = styled.div`
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
  &::before {
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
    transform: translate3d(0%, -160%, 0);
    color: ${Colors.Gray};
    font-size: 1.4rem;
    content: 'Practice';
    text-align: center;
  }
`

export const PracticeBaseCell = styled.div`
  ${baseCellStyle}
`

export const GridToggleBtn = styled.button`
  display: flex;
  align-items: center;

  background: #fff;
  margin-bottom: 3rem;

  span {
    font-size: 1.4rem;
  }

  svg {
    width: 2rem;
    height: 2rem;
    color: #000;
  }
`

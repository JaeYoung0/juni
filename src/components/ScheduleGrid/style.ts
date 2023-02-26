import { Colors } from '@/styles/colors'
import Z_INDEX from '@/styles/z-index'
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
  color: #fff;
  padding: 0;
  display: flex;
  align-items: center;
`

export const GridWrapper = styled.div`
  overflow: hidden;
  background: #000;
  padding: 6rem 0rem;
`
export const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 7fr 1fr 7fr;
  padding: 0;
  margin-bottom: 10rem;
  background: #000;

  div:not(:nth-of-type(2)) > div {
    border-top: 1px solid ${Colors.Gray};
  }
`

export const CurrentTimeLine = styled.p`
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: #7755ff;
  z-index: 10;

  &::before {
    position: absolute;
    content: '';
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #7755ff;
  }
`

export const Times = styled.div`
  position: relative;
  &::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 50%, 0);

    font-size: 1.4rem;
    color: ${Colors.Gray};
    content: '24';
  }
`

export const Time = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;

  ${baseCellStyle}

  span {
    font-size: 1.4rem;
    color: ${Colors.Gray};
    transform: translateY(-50%);
  }
`

export const PlanList = styled.div`
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

  /* last-of-type이 PlanBaseCell이랑 PlanItem을 구분하지 못함... PlanItem을 button으로 바꿔서 대응함 */
  &:last-of-type {
    border-bottom: 1px solid ${Colors.Gray};
  }
`

export const PlanItem = styled.button<{ top: number; height: number }>`
  position: absolute;
  top: ${({ top }) => `${top}%`};
  height: ${({ height }) => `${height}%`};
  left: 0;
  z-index: ${Z_INDEX.ScheduleItem};

  ${planCellStyle}
  background: gray;
  padding: 1rem;

  border-bottom: 1px solid #fff;

  span {
    font-size: 1.4rem;
    line-height: 1.5;
    text-align: left;
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;
  }
`

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

export const PracticeBaseCell = styled(PlanBaseCell)``

export const PracticeItem = styled(PlanItem)``

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

export const CurrentUnix = styled.h2`
  color: #fff;
  font-size: 1.6rem;
  text-align: center;
  padding: 2rem 0rem;
`

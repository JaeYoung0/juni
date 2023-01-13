import styled from '@emotion/styled'

export const Container = styled.div`
  /* display: grid; */
  /* grid-template-columns: 1fr 5fr; */
`

export const CalendarBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.6rem;
  color: #fff;
  background: #2f2f2f;

  padding: 1em 1em 2em;
`

export const HeaderBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 1.5em 0;

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

  font-size: 0.8em;
  color: gray;

  margin-bottom: 1em;
`

export const Day = styled.div`
  width: 100%;
  text-align: center;
`

export const DatesBox = styled.div``

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  margin: 0.3em 0;
`

export const Cell = styled.button`
  width: 100%;
  aspect-ratio: 1;

  color: #fff;
  background: #121212;

  border-radius: 50%;
  margin: 0 0.3em;

  transition: 0.2s ease-out;

  &.current {
    background: #7755ff;
  }

  /* &:hover:not(.start, .end) {
    background: #434343;
  } */

  &.today {
    border: 1px solid #fff;
  }
`

export const SelectedRangeBox = styled.div`
  background: #2f2f2f;
  font-size: 16px;
`

export const HelperBox = styled.div`
  width: 100%;
  height: 100%;

  max-width: 10em;
  background: #2f2f2f;
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    background: #2f2f2f;
    color: #fff;
    /* border: 1px solid #000; */
    padding: 0.5em;

    &:hover {
      background: #000;
    }
  }
`

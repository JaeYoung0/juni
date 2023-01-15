import styled from '@emotion/styled'

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
  overflow-x: hidden;
`

export const Box = styled.div`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
`

export const UserName = styled.h2`
  font-size: 1.6rem;
  color: #fff;
  padding: 2rem 0rem;
  text-align: center;
`

export const ToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  /* width: 5rem; */
  /* height: 5rem; */
  padding: 0;
  background: #fff;
  border: 1px solid #2959ff;

  svg {
    width: 3rem;
    height: 3rem;
  }

  p {
    font-size: 1.4rem;
    color: #000;
  }
`

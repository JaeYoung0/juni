import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem 0rem;

  input {
    width: 80%;
    margin: 0 auto;
    padding: 1rem 2rem;
  }

  button {
    padding: 0.5rem 1rem;
    width: 80%;
    margin: 0 auto;
  }

  row-gap: 2rem;
`

export const CategroyList = styled.div`
  padding: 0 4rem 10rem;
`

export const CategoryItem = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;

  span {
    font-size: 1.6rem;
    color: #fff;
  }

  button {
    width: 10rem;
    margin: 0;
  }
`

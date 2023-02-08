import styled from '@emotion/styled'

export const BackButton = styled.button`
  margin-bottom: 3rem;
`

export const ListBox = styled.ol`
  li {
    display: flex;
    justify-content: space-around;
    color: #fff;
    font-size: 2rem;

    input {
      flex: 1;
      margin-right: 2rem;
    }
  }
`

export const Form = styled.form`
  textarea {
    width: 100%;
    min-height: 20rem;
    background: #222;
    color: #fff;
    font-size: 2rem;
  }

  button {
    display: flex;
    margin-left: auto;
  }
`

export const Buttons = styled.div`
  button + button {
    margin-left: 2rem;
  }
`

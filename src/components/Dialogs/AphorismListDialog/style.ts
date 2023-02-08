import styled from '@emotion/styled'

export const BackButton = styled.button`
  margin-bottom: 3rem;
`

export const ListBox = styled.ol`
  li {
    color: #fff;

    margin-bottom: 3rem;

    textarea {
      font-size: 1.6rem;
      width: 100%;
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
  display: flex;
  justify-content: flex-end;
  button + button {
    margin-left: 1rem;
  }
`

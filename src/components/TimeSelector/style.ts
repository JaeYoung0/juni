import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Row = styled.div`
  padding: 0.5rem 0rem;

  & + & {
  }
`

export const Dialog = styled.dialog`
  width: 32rem;
  height: 40.5rem;
  padding: 1rem;
  border-radius: 5px;
`

export const Form = styled.form`
  height: 90%;
`

export const DialogTitle = styled.p`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`

const inputStyle = css`
  border: 1px solid #7755ff;
  border-radius: 3px;
  padding: 0.5rem;
`

export const TitleInput = styled.input`
  width: 100%;
  ${inputStyle}
`

export const Select = styled.select`
  border-radius: 3px;
  width: 5rem;
  ${inputStyle}
`

export const Label = styled.label`
  font-size: 1.4rem;
`

export const ContentTextArea = styled.textarea`
  width: 100%;
  height: 25rem;

  ${inputStyle}
`

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 0.5rem;
`

export const Button = styled.button`
  background: #7755ff;
  color: #fff;
  padding: 1rem 3rem;
  border-radius: 5px;

  & + & {
    margin-left: 1rem;
  }
`

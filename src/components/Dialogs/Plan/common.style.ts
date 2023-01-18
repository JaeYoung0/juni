import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Row = styled.div`
  padding: 0.5rem 0rem;

  & + & {
  }
`

export const Dialog = styled.dialog`
  // dialog position default: fixed
  width: 100%;
  max-width: 40rem;
  height: 50rem;
  padding: 1rem;
  border-radius: 5px;
  overflow: visible;
`

export const CloseButton = styled.button`
  position: absolute;
  right: -1rem;
  top: -4rem;
  width: 4rem;
  height: 4rem;
  padding: 0;
  font-size: 2rem;
  color: #fff;
  background: transparent;
`

export const Wrapper = styled.div`
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
  font-size:1.6rem;
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
  font-size: 1.6rem;
  /* font-family: 'Pretendard'; */
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

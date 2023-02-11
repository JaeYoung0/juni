import { Colors } from '@/styles/colors'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const slideUp = keyframes`
    from {
        transform: translateY(100%);
    }

    to {
        transform: translateY(0);
    }
`

export const Dialog = styled.dialog`
  bottom: 0;

  width: 100%;
  background: #000;
  padding: 2rem;

  transform: translateY(100%);
  animation: ${slideUp} ease-out 0.5s forwards;
`

export const Form = styled.form`
  textarea {
    width: 100%;
    min-height: 20rem;
    background: #222;
    color: #fff;
    font-size: 2rem;
  }

  textarea + button {
    margin-top: 3rem;
  }
`

export const Title = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  color: #fff;

  margin-bottom: 2rem;
`

export const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: #000;
  opacity: 0.8;

  transform: tra;
`

export const Button = styled.button`
  width: 100%;
  border-radius: 5px;
  background: ${Colors.Purple};
  padding: 1rem 2rem;
  border: none;

  font-size: 1.6rem;
  color: #fff;
`

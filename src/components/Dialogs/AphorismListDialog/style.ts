import { css } from '@emotion/react'
import styled from '@emotion/styled'

const hideScroll = css`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`

export const BackButton = styled.button`
  color: #fff;
  background: transparent;
`

export const PlusButton = styled.button`
  color: #fff;
  background: transparent;
`

export const ListBox = styled.ol`
  height: 100%;
  overflow-y: scroll;
  padding: 0rem 0rem 10rem;

  ${hideScroll}

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

export const AphorismText = styled.p`
  border-radius: 10px;
  padding: 2rem;
  font-size: 1.4rem;
  line-height: 1.5;
`

export const NoticeText = styled.p`
  width: 100%;
  height: calc(var(--vh) * 50);
  display: flex;
  align-items: center;

  font-size: 1.8rem;
  line-height: 1.5;
  color: #fff;
  text-align: center;
  word-break: keep-all;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  button + button {
    margin-left: 1rem;
  }
`

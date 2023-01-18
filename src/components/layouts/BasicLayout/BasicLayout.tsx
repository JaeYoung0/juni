import React, { CSSProperties } from 'react'
import styled from '@emotion/styled'
import { css, Interpolation, Theme } from '@emotion/react'

type Props = {
  children: React.ReactNode
  center?: boolean
  style?: CSSProperties
  css?: Interpolation<Theme>
}

function BasicLayout({ children, ...props }: Props) {
  return <Container {...props}>{children}</Container>
}

export default BasicLayout

export const Container = styled.div<Omit<Props, 'children'>>`
  width: 100%;
  height: 100%;
  min-height: calc(var(--vh) * 100);
  background-color: #000000;
  overflow-x: hidden;

  ${({ center }) =>
    center &&
    css`
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    `}
`

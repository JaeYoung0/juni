import React, { CSSProperties } from 'react'
import styled from '@emotion/styled'
import { css, Interpolation, Theme } from '@emotion/react'
import BottomNavigation from '@/components/BottomNavigation'
import { NAV_HEIGHT } from '@/components/BottomNavigation/BottomNavigation'

type Props = {
  children: React.ReactNode
  center?: boolean
  style?: CSSProperties
  css?: Interpolation<Theme>
}

function BasicLayout({ children, ...props }: Props) {
  return (
    <Container {...props}>
      <Main>{children}</Main>
      <BottomNavigation />
    </Container>
  )
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

const Main = styled.main`
  max-height: calc(var(--vh) * 100 - ${NAV_HEIGHT});
`

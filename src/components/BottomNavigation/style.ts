import { Colors } from '@/styles/colors'
import Z_INDEX from '@/styles/z-index'
import styled from '@emotion/styled'
import Link from 'next/link'

export const Navigation = styled.div`
  position: fixed;
  z-index: ${Z_INDEX.BottomNavigation};
  background: #0d0d0d;
  width: 100%;
  height: 6rem;
  left: 0;
  bottom: 0;

  display: flex;
  justify-content: space-around;
`

export const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 1.2rem;
  color: ${Colors.Gray};

  padding: 1rem;

  svg {
    width: 3rem;
    height: 3rem;
    margin-bottom: 0.5rem;
  }
`

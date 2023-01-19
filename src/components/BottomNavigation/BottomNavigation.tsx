import React from 'react'
import * as S from './style'
import HomeIcon from '@mui/icons-material/Home'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import BarChartIcon from '@mui/icons-material/BarChart'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { Colors } from '@/styles/colors'

const NAVI_LIST = [
  {
    targetPage: '/',
    Icon: () => <HomeIcon />,
    name: '홈',
  },
  {
    targetPage: '/schedule',
    Icon: () => <CalendarMonthIcon />,
    name: '스케줄',
  },
  {
    targetPage: '/chart',
    Icon: () => <BarChartIcon />,
    name: '통계',
  },
  {
    targetPage: '/my',
    Icon: () => <AssignmentIndIcon />,
    name: '내정보',
  },
]

export const NAV_HEIGHT = '6rem'

function BottomNavigation() {
  const router = useRouter()
  return (
    <S.Navigation>
      {NAVI_LIST.map((item) => (
        <S.NavItem
          key={item.name}
          href={item.targetPage}
          css={css`
            color: ${item.targetPage === router.asPath ? '#fff' : Colors.Gray};
          `}
        >
          {<item.Icon />}
          {item.name}
        </S.NavItem>
      ))}
    </S.Navigation>
  )
}

export default BottomNavigation

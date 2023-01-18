import React from 'react'
import * as S from './style'
import HomeIcon from '@mui/icons-material/Home'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import BarChartIcon from '@mui/icons-material/BarChart'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
function BottomNavigation() {
  return (
    <S.Navigation>
      <S.NavItem href="/">
        <HomeIcon />홈
      </S.NavItem>
      <S.NavItem href="/">
        <CalendarMonthIcon />
        계획
      </S.NavItem>
      <S.NavItem href="/">
        <BarChartIcon />
        통계
      </S.NavItem>
      <S.NavItem href="/">
        <AssignmentIndIcon />
        내정보
      </S.NavItem>
    </S.Navigation>
  )
}

export default BottomNavigation

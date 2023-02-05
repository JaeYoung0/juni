import React from 'react'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import useDialog from '@/service/dialogAdapter'
import { NativeBridge } from '@/lib/bridge'

export type CalendarDialProps = {
  goToday: () => void
  goPrevWeek: () => void
  goNextWeek: () => void
  toggleMonthlyView: () => void
  isMonthlyView: boolean
}
function CalendarDial(props: CalendarDialProps) {
  const { goToday, goPrevWeek, goNextWeek, toggleMonthlyView, isMonthlyView } = props
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { openDialog } = useDialog()

  const bridge = new NativeBridge()
  const openTimer = () => bridge.openTimer()

  const actions = [
    {
      icon: <span>{isMonthlyView ? '주단위로 보기' : '월단위로 보기'}</span>,
      name: isMonthlyView ? '주단위로 보기' : '월단위로 보기',
      onClick: () => toggleMonthlyView(),
    },
    { icon: <span>지난주</span>, name: '지난주', onClick: () => goPrevWeek() },
    { icon: <span>오늘</span>, name: '오늘', onClick: () => goToday() },
    { icon: <span>다음주</span>, name: '다음주', onClick: () => goNextWeek() },
    {
      icon: <span>스톱워치</span>,
      name: '스톱워치',
      onClick: openTimer,
    },
  ]

  return (
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'fixed', right: 20, bottom: 100 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action, idx) => (
          <SpeedDialAction
            key={idx}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}

export default CalendarDial

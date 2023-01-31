import React from 'react'
import Box from '@mui/material/Box'
import Backdrop from '@mui/material/Backdrop'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'
import { css } from '@emotion/react'
import { Colors } from '@/styles/colors'

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

  const actions = [
    { icon: <button>버튼</button>, name: '오늘', onClick: () => goToday() },
    { icon: <button>버튼</button>, name: '지난주', onClick: () => goPrevWeek() },
    { icon: <button>버튼</button>, name: '다음주', onClick: () => goNextWeek() },
    {
      icon: <button>버튼</button>,
      name: isMonthlyView ? '주단위로 보기' : '월단위로 보기',
      onClick: () => toggleMonthlyView(),
    },
  ]

  //   <button onClick={toggleMonthlyView}>
  //   {isMonthlyView ? '주단위로 보기' : '월단위로 보기'}
  // </button>
  // <button onClick={() => goToday()}>오늘</button>
  // <button onClick={() => goPrevWeek()}>이전주</button>
  // <button onClick={() => goNextWeek()}>다음주</button>
  // <button
  //   onClick={() => {
  //     openDialog({ variant: 'StopwatchDialog', props: {} })
  //   }}
  // >
  //   스톱워치
  // </button>

  return (
    <Box>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'fixed', right: 20, bottom: 100 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}

export default CalendarDial

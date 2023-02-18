import useWebviewBridge from '@/lib/bridge'
import * as S from './style'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms'

export type CalendarDialProps = {
  goToday: () => void
  goPrevWeek: () => void
  goNextWeek: () => void
  toggleMonthlyView: () => void
  isMonthlyView: boolean
}
function CalendarDial(props: CalendarDialProps) {
  const { goToday, goPrevWeek, goNextWeek, toggleMonthlyView, isMonthlyView } = props

  // const bridge = new NativeBridge()
  // const openTimer = () => bridge.openTimer()\

  const { openTimer } = useWebviewBridge()

  return (
    <S.Dial onClick={openTimer}>
      <AccessAlarmsIcon />
    </S.Dial>
  )
}

export default CalendarDial

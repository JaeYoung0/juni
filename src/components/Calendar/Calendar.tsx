import { useCalendarAtom } from '@/domain/calendar'
import CalendarView from './CalendarView'

function Calendar() {
  const [_, setCalendarAtom] = useCalendarAtom()

  const handleChange = (unix: number) => {
    setCalendarAtom(unix)
  }

  // 이게 무슨 View컴포넌트냐 ...
  return <CalendarView onChange={handleChange} />
}

export default Calendar

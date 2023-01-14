import { useCalendarAtom } from '@/domain/calendar/calendar'
import CalendarView from './CalendarView'

function Calendar() {
  const [_, setCalendarAtom] = useCalendarAtom()

  const handleChange = (unix: number) => {
    setCalendarAtom(unix)
  }

  return <CalendarView onChange={handleChange} />
}

export default Calendar

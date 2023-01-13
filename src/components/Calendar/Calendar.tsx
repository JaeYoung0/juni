import { useCalendarAtomState } from '@/domain/Calendar/calendar'
import CalendarView from './CalendarView'

function Calendar() {
  const [_, setCalendarAtom] = useCalendarAtomState()

  const handleChange = (unix: number) => {
    setCalendarAtom(unix)
  }

  return <CalendarView onChange={handleChange} />
}

export default Calendar

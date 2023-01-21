import { useCalendarAtom } from '@/domain/calendar'
import dayjs from 'dayjs'
import CalendarView from './CalendarView'

function Calendar() {
  const [calendarAtom, setCalendarAtom] = useCalendarAtom()
  console.log('@@calendarAtom', calendarAtom, dayjs().utc().format())

  const handleChange = (unix: number) => {
    setCalendarAtom(unix)
  }

  return <CalendarView onChange={handleChange} />
}

export default Calendar

import dayjs from 'dayjs'
import { useMemo } from 'react'

// https://incorporated.zone/day-and-date/
// day <- 요일(월, 화 ...) or 일 (1일 2일 ..)
// date <- 구체적인 특정 날짜 (11월 14일)
const makeDateItem = (date: dayjs.Dayjs) => ({
  day: date.get('date'),
  year: date.get('year'),
  month: date.get('month'),
  date,
})

export type DateCell = ReturnType<typeof makeDateItem>
type DateCellList = DateCell[]
type WeekData = { weekOfYear: number; data: DateCellList }
type AllDates = WeekData[]

type Props = {
  selectedDate: dayjs.Dayjs
  currentCalendar: dayjs.Dayjs
}
function useDateCell({ selectedDate, currentCalendar }: Props) {
  const monthlyDates: AllDates = useMemo(() => {
    let firstDateOfMonth = currentCalendar.startOf('month')
    const firstWeekOf = (date: dayjs.Dayjs) => date.weekday(0)
    const firstDateOfCalendar = firstWeekOf(firstDateOfMonth) // 현재 달력에 해당하는 달의 첫번째 날에 해당하는 주의 첫번째 날 = 달력의 시작점

    let dateOfCalendar = firstDateOfCalendar

    const nextMonth = currentCalendar.add(1, 'month').get('M')

    const allDates: AllDates = []

    // dateOfCalendar에 해당하는 주의 첫번째 날에 해당하는 달이 다음달이 아닐때까지 루프 돌리기
    let weekDates = []
    let dayCounter = 1
    while (dateOfCalendar.get('M') !== nextMonth) {
      const item = makeDateItem(dateOfCalendar)
      weekDates.push(item)
      if (dayCounter === 7) {
        allDates.push({
          weekOfYear: dateOfCalendar.isoWeek(),
          data: weekDates,
        })
        weekDates = []
        dayCounter = 0
      }
      dayCounter++
      dateOfCalendar = dateOfCalendar.add(1, 'day')
    }

    // allDates의 마지막날이 해당월의 실제 마지막날짜가 아닌 경우 1주일치를 더해준다.
    const tail = allDates.at(-1)?.data.at(-1)
    const endDayOfTail = tail?.date.get('D')
    const actualEndDayOfTail = tail?.date.endOf('M').get('D')

    if (tail && endDayOfTail !== actualEndDayOfTail) {
      const firstDateOfWeek = tail?.date.add(1, 'week').startOf('week')

      const data = Array.from({ length: 7 }, (_, i) => i).map((n) => {
        const item = firstDateOfWeek.add(n, 'day')
        return makeDateItem(item)
      })

      allDates.push({
        weekOfYear: firstDateOfWeek.isoWeek(),
        data,
      })
    }

    return allDates
  }, [currentCalendar])

  const weeklyDates: AllDates = useMemo(() => {
    const firstDateOfWeek = selectedDate.startOf('week')

    const data = Array.from({ length: 7 }, (_, i) => i).map((n) => {
      const item = firstDateOfWeek.add(n, 'day')
      return makeDateItem(item)
    })

    return [
      {
        weekOfYear: firstDateOfWeek.isoWeek(),
        data,
      },
    ]
  }, [selectedDate])

  return { monthlyDates, weeklyDates }
}

export default useDateCell

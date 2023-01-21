import { useEffect, useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import * as S from './style'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import useHorizontalSwipe from '@/hooks/useHorizontalSwipe'
import useVerticalSwipe from '@/hooks/useVerticalSwipe'

// https://incorporated.zone/day-and-date/
// day <- 요일(월, 화 ...) or 일 (1일 2일 ..)
// date <- 구체적인 특정 날짜 (11월 14일)
const makeDateItem = (date: dayjs.Dayjs) => ({
  day: date.get('date'),
  year: date.get('year'),
  month: date.get('month'),
  date,
})

type DateCell = ReturnType<typeof makeDateItem>
type WeekData = { weekOfYear: number; data: DateCellList }
type AllDates = WeekData[]

type DateCellList = DateCell[]

export type CalendarViewProps = {
  onChange: (unix: number) => void
}

export const TODAY_UNIX = dayjs().startOf('date').unix()

function CalendarView({ onChange }: CalendarViewProps) {
  const [currentCalendar, setCurrentCalendar] = useState<Dayjs>(dayjs().startOf('M'))
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().startOf('date'))
  const [showFull, setShowFull] = useState(false)

  console.log(
    '@@selectedDate',
    selectedDate.format(),
    '--------캘린더는------',
    currentCalendar.format()
  )

  useEffect(() => {
    if (selectedDate.get('y') > currentCalendar.get('y'))
      setCurrentCalendar((prev) => prev.add(1, 'M'))
    else if (selectedDate.get('y') < currentCalendar.get('y'))
      setCurrentCalendar((prev) => prev.subtract(1, 'M'))
    else if (selectedDate.get('M') > currentCalendar.get('M'))
      setCurrentCalendar((prev) => prev.add(1, 'M'))
    else if (selectedDate.get('M') < currentCalendar.get('M'))
      setCurrentCalendar((prev) => prev.subtract(1, 'M'))
  }, [selectedDate])

  const goNextCalendar = () => {
    const result = currentCalendar.add(1, 'month')
    setCurrentCalendar(result)
  }

  const goPrevCalendar = () => {
    const result = currentCalendar.subtract(1, 'month')
    setCurrentCalendar(result)
  }

  const allDates: AllDates = useMemo(() => {
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
      console.log('@@dateOfCalendar', dateOfCalendar.format())

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
  }, [currentCalendar, showFull])

  const handleClickCell = (date: DateCell) => {
    setSelectedDate(date.date)
  }

  const thisWeekDates: AllDates = useMemo(() => {
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

  const dateCellList = showFull ? allDates : thisWeekDates

  useEffect(() => {
    onChange(selectedDate.unix())
  }, [selectedDate])

  const { onTouchStart, onTouchMove, onTouchEnd } = useVerticalSwipe({
    onUpSwipe: () => setShowFull(false),
    onDownSwipe: () => setShowFull(true),
  })

  const goNextWeek = () => setSelectedDate(selectedDate.add(1, 'weeks'))
  const goPrevWeek = () => setSelectedDate(selectedDate.subtract(1, 'week'))

  const {
    onTouchStart: onHeaderTouchStart,
    onTouchMove: onHeaderTouchMove,
    onTouchEnd: onHeaderTouchEnd,
  } = useHorizontalSwipe({
    onLeftSwipe: !showFull ? goNextWeek : goNextCalendar,
    onRightSwipe: !showFull ? goPrevWeek : goPrevCalendar,
  })

  return (
    <S.Container>
      <S.CalendarBox onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <button onClick={() => setShowFull(!showFull)}>버튼</button>
        <button onClick={() => goPrevWeek()}>이전주</button>
        <button onClick={() => goNextWeek()}>다음주</button>
        <S.HeaderBox
          onTouchStart={onHeaderTouchStart}
          onTouchMove={onHeaderTouchMove}
          onTouchEnd={onHeaderTouchEnd}
        >
          <button onClick={() => goPrevCalendar()}>
            <ArrowBackIosNewIcon />
          </button>
          <span>{currentCalendar.format('YYYY년 MMM')}</span>
          <button onClick={() => goNextCalendar()}>
            <ArrowForwardIosIcon />
          </button>
        </S.HeaderBox>
        <S.DaysBox>
          {Array.from({ length: 7 }, (_, idx) => (
            <S.Day key={idx}>{dayjs().weekday(idx).format('dd')}</S.Day>
          ))}
        </S.DaysBox>
        <S.DatesBox>
          {dateCellList.map((weekDates, index) => {
            return (
              <S.Row key={index}>
                {weekDates.data.map((cell, idx) => {
                  return (
                    <S.Cell
                      key={idx}
                      onClick={() => handleClickCell(cell)}
                      notThisMonth={cell.date.get('M') !== currentCalendar.get('M')}
                      isToday={cell.date.isToday()}
                      isSelected={cell.date.unix() === selectedDate.unix()}
                    >
                      <span>{cell.day}</span>
                    </S.Cell>
                  )
                })}
              </S.Row>
            )
          })}
        </S.DatesBox>
      </S.CalendarBox>
    </S.Container>
  )
}

export default CalendarView

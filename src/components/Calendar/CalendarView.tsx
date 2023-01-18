import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import * as S from './style'
import locale from 'dayjs/locale/ko'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import useHorizontalSwipe from '@/hooks/useHorizontalSwipe'

// day <- 요일
// date <- 날짜 (1일, 2일 ..)
const formateDateObject = (currentCalendar: dayjs.Dayjs, date: dayjs.Dayjs) => ({
  day: date.toObject().date,
  month: date.toObject().months,
  year: date.toObject().years,
  isCurrentMonth: date.toObject().months === currentCalendar.month(),
  isCurrentDay: date.isToday(),
  unixStamp: date.unix(), // unix time: 1970년 1월 1일 00:00:00 UTC 로부터 현재까지의 누적된 초(seconds) 값
})

type DateCell = ReturnType<typeof formateDateObject>

type WeekDates = DateCell[]

export type CalendarViewProps = {
  onChange: (unix: number) => void
}

const now = dayjs().locale({
  ...locale,
})

export const TODAY_UNIX = now.startOf('date').unix()

function CalendarView({ onChange }: CalendarViewProps) {
  const [currentCalendar, setCurrentCalendar] = useState<Dayjs>(now)
  const [allDates, setAllDates] = useState<{ dates: WeekDates }[]>([{ dates: [] }])
  const [current, setCurrent] = useState<number>(TODAY_UNIX)

  const goNextMonth = () => {
    const result = currentCalendar.add(1, 'month')
    setCurrentCalendar(result)
  }

  const goPrevMonth = () => {
    const result = currentCalendar.subtract(1, 'month')
    setCurrentCalendar(result)
  }

  const getAllDates = () => {
    let date = currentCalendar.startOf('month').weekday(0) // 현재 달력에 해당하는 달의 첫번째 날에 해당하는 주의 첫번째 날 = 달력의 시작점
    const nextMonth = currentCalendar.add(1, 'month').month()

    let weekDates: WeekDates = []
    const allDates: { dates: WeekDates }[] = []

    // 현재 date에 해당하는 주의 첫번째 날에 해당하는 달이 다음달이 아닐때까지 루프 돌리기
    let dayCounter = 1
    while (date.weekday(0).toObject().months !== nextMonth) {
      const formated = formateDateObject(currentCalendar, date)
      weekDates.push(formated)
      if (dayCounter === 7) {
        allDates.push({ dates: weekDates })
        weekDates = []
        dayCounter = 0
      }
      dayCounter++
      date = date.add(1, 'day')
    }

    setAllDates(allDates)
  }

  const handleClickCell = (date: DateCell) => {
    setCurrent(date.unixStamp)
  }

  const { onTouchStart, onTouchMove, onTouchEnd } = useHorizontalSwipe({
    onLeftSwipe: goNextMonth,
    onRightSwipe: goPrevMonth,
  })

  useEffect(() => {
    getAllDates()
  }, [currentCalendar])

  useEffect(() => {
    onChange(current)
  }, [current])

  const getCellClassName = (date: DateCell) => {
    if (date.unixStamp === current) return 'current'
    else return ''
  }

  return (
    <S.Container>
      <S.CalendarBox onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <S.HeaderBox>
          <button onClick={() => goPrevMonth()}>
            <ArrowBackIosNewIcon />
          </button>
          <span>{currentCalendar.format('YYYY년 MMM')}</span>
          <button onClick={() => goNextMonth()}>
            <ArrowForwardIosIcon />
          </button>
        </S.HeaderBox>
        <S.DaysBox>
          {Array.from({ length: 7 }, (_, idx) => (
            <S.Day key={idx}>{now.weekday(idx).format('dd')}</S.Day>
          ))}
        </S.DaysBox>
        <S.DatesBox>
          {allDates.map((weekdates, index) => {
            return (
              <S.Row key={index}>
                {weekdates.dates.map((date, idx) => (
                  <S.Cell
                    onClick={() => handleClickCell(date)}
                    key={idx}
                    className={getCellClassName(date)}
                  >
                    <span>{date.day}</span>
                  </S.Cell>
                ))}
              </S.Row>
            )
          })}
        </S.DatesBox>
      </S.CalendarBox>
    </S.Container>
  )
}

export default CalendarView

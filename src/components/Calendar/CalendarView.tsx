import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import * as S from './style'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import useSwipe from '@/hooks/useSwipe'
import useDateCell, { DateCell } from './useDateCell'
import CalendarDial from './CalendarDial'

export type CalendarViewProps = {
  onChange: (unix: number) => void
}

export const TODAY_UNIX = dayjs().startOf('date').unix()
const THIS_DATE = dayjs().startOf('date')
const THIS_MONTH = dayjs().startOf('M')

function CalendarView({ onChange }: CalendarViewProps) {
  const [currentCalendar, setCurrentCalendar] = useState<Dayjs>(THIS_MONTH)
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().startOf('date'))

  const [isMonthlyView, setIsMonthlyView] = useState(false)

  const { monthlyDates, weeklyDates } = useDateCell({ currentCalendar, selectedDate })
  const dateCellList = isMonthlyView ? monthlyDates : weeklyDates

  // 캘린더를 넘길 때 selectedDate도 변한다. (selectedDate는 달을 넘기면 달의 첫번째날, 주를 넘기면 주의 첫번째날로 변함)
  const handleClickCell = (cell: DateCell) => setSelectedDate(cell.date)
  const goToday = () => {
    setSelectedDate(THIS_DATE)
    setCurrentCalendar(THIS_MONTH)
  }
  const goNextCalendar = () => setSelectedDate(selectedDate.add(1, 'M').startOf('M'))
  const goPrevCalendar = () => setSelectedDate(selectedDate.subtract(1, 'M').startOf('M'))
  const goNextWeek = () => setSelectedDate(selectedDate.add(1, 'week'))
  const goPrevWeek = () => setSelectedDate(selectedDate.subtract(1, 'week'))
  const toggleMonthlyView = () => setIsMonthlyView(!isMonthlyView)

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
    onLeftSwipe: !isMonthlyView ? goNextWeek : goNextCalendar,
    onRightSwipe: !isMonthlyView ? goPrevWeek : goPrevCalendar,
    onUpperSwipe: toggleMonthlyView,
    onDownSwipe: toggleMonthlyView,
  })

  useEffect(() => {
    onChange(selectedDate.unix())
  }, [selectedDate])

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

  const DialProps = {
    goToday,
    goPrevWeek,
    goNextWeek,
    toggleMonthlyView,
    isMonthlyView,
  }

  return (
    <S.Container>
      {/* Header */}
      <S.CalendarBox onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        {isMonthlyView && (
          <S.HeaderBox>
            <button onClick={() => goPrevCalendar()}>
              <ArrowBackIosNewIcon />
            </button>
            <span>{currentCalendar.format('YYYY년 MMM')}</span>
            <button onClick={() => goNextCalendar()}>
              <ArrowForwardIosIcon />
            </button>
          </S.HeaderBox>
        )}

        {/* Body */}
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
                      {isMonthlyView && <span>{cell.day}</span>}
                      {!isMonthlyView && (
                        <span>
                          {cell.month + 1}/{cell.day}
                        </span>
                      )}
                    </S.Cell>
                  )
                })}
              </S.Row>
            )
          })}
        </S.DatesBox>
      </S.CalendarBox>
      <CalendarDial {...DialProps} />
    </S.Container>
  )
}

export default CalendarView

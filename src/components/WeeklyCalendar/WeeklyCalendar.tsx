import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import * as S from './WeeklyCalendar.style'
interface Props {}

const getAllDates = (target: dayjs.Dayjs) => {
  const firstDateOfWeek = target.subtract(1, 'week').startOf('week')

  const lastWeekDates = Array.from({ length: 7 }, (_, i) => i).map((n) => {
    const item = firstDateOfWeek.add(n, 'day')

    return {
      date: item.format('M/DD'),
      day: new Date(item.toString()).toLocaleDateString('en-US', { weekday: 'short' }),
    }
  })

  const thisWeekDates = Array.from({ length: 7 }, (_, i) => i).map((n) => {
    const item = firstDateOfWeek.add(n, 'day')

    return {
      date: item.format('M/DD'),
      day: new Date(item.toString()).toLocaleDateString('en-US', { weekday: 'short' }),
    }
  })

  const nextWeekDates = Array.from({ length: 7 }, (_, i) => i).map((n) => {
    const item = firstDateOfWeek.add(n, 'day')

    return {
      date: item.format('M/DD'),
      day: new Date(item.toString()).toLocaleDateString('en-US', { weekday: 'short' }),
    }
  })

  return { lastWeekDates, thisWeekDates, nextWeekDates }
}

function WeeklyCalendar({}: Props) {
  const [target, setTarget] = useState(dayjs())
  // 지난주, 이번주, 다음주 weekDates를 만들어놓는다.
  const [weekDates, setWeekDates] = useState(getAllDates(target))
  console.log('@@weekDates', weekDates)

  useEffect(() => {
    setWeekDates(getAllDates(target))
  }, [target])

  return (
    <>
      <button
        onClick={() => {
          setTarget(dayjs().subtract(1, 'week'))
        }}
      >
        좌
      </button>
      <button>우</button>
      <S.ScrollSnapContainer>
        <S.ScrollSnapItem>
          {weekDates.lastWeekDates.map((item) => (
            <S.Date key={item.date}>{item.date}</S.Date>
          ))}
        </S.ScrollSnapItem>

        <S.ScrollSnapItem>
          {weekDates.thisWeekDates.map((item) => (
            <S.Date key={item.date}>{item.date}</S.Date>
          ))}
        </S.ScrollSnapItem>

        <S.ScrollSnapItem>
          {weekDates.nextWeekDates.map((item) => (
            <S.Date key={item.date}>{item.date}</S.Date>
          ))}
        </S.ScrollSnapItem>
        {/* {weekDates.map((item) => {
          return <S.ScrollSnapItem key={item.date}>{item.date}</S.ScrollSnapItem>
        })} */}
      </S.ScrollSnapContainer>
    </>
  )
}

export default WeeklyCalendar

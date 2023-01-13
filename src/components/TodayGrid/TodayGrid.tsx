import { useCalendarAtomState } from '@/domain/Calendar/calendar'
import { ScheduleItem } from '@/domain/Schedule/schedule'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import TimeSelector, { TimeSelectorRef } from '../TimeSelector'

import * as S from './style'

function TodayGrid() {
  const times = Array.from({ length: 24 }, (v, i) => i)
  const plans = Array.from({ length: 24 }, (v, i) => i + 1)
  const real = Array.from({ length: 24 }, (v, i) => i + 1)

  const [schedules, setSchedules] = useState<ScheduleItem[]>([])
  const [calendarAtom] = useCalendarAtomState()

  //   TODO1. 계획 셀 클릭했을 때
  // '계획'을 클릭 => 모달이 뜬다 => 모달에서는 00시 ~ 00시까지 000을 한다는 입력을 받는다. (제목 + 상세내용) 그리고 색상도 정한다 (POST 요청을 보냄)
  // => 확인을 클릭하면 입력된 시간만큼이 지정한 색상대로 보인다.
  // => 개요화면에서는 제목만 보인다. 클릭하면 모달에서 제목 + 상세내용이 보인다.

  // TODO2. 현재 어떤 날짜인지 (12/22)를 전역상태에서 받아오고 12/22에 해당하는 시간표를 보여주기.

  /**
   * TODO3. 실제 셀 클릭했을 때
   * 바로 좌편에 있는 계획 실행여부를 묻는다 => YES인경우 화려한 애니메이션 / NO인경우 그 시간에 무엇을 했는지 입력. / 계획한 것들을 바로 선택하게 할 수 있는 셀렉터를 제공
   */

  /**
   * TODO4.
   * 계획셀이 끝나는 시점에 push 알람
   */

  /**
   * 완벽하게 계획대로 했으면 별을 모음
   * 한달동안 별이 몇개인지 볼 수 있음
   * 그 날에 왜 그것을 못했는지 적어보는 성찰노트도 있으면 좋겠음.
   */

  const timeSelectorRef = useRef<TimeSelectorRef | null>(null)

  const saveSchedule = (payload: Omit<ScheduleItem, 'dateTime'>) => {
    const saved = JSON.parse(localStorage.getItem('@schedule') ?? '[]') as ScheduleItem[]
    const stack = [...saved]

    // TODO. 업데이트면 기존 데이터 바꿔치기, 새로 생기면 그냥 추가
    stack.push({ ...payload, dateTime: calendarAtom })
    localStorage.setItem('@schedule', JSON.stringify(stack))
  }

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('@schedule') ?? '[]') as ScheduleItem[]
    setSchedules(results)
  }, [])

  console.log('@@schedules', schedules)

  return (
    <>
      <S.CurrentDateTime>
        {`< `}선택 날짜: {dayjs.unix(calendarAtom).format('YYYY-MM-DD')}
        {` >`}
      </S.CurrentDateTime>
      <S.VacantArea />
      <div />
      <S.Container>
        <S.Times>
          {times.map((item) => (
            <S.Time className="time" key={item}>
              <span>{item}시</span>
            </S.Time>
          ))}
        </S.Times>

        <S.Plans>
          {plans.map((item) => (
            <S.Plan
              key={item}
              onClick={() => {
                timeSelectorRef.current?.showModal()
              }}
            >
              <span>계획</span>
            </S.Plan>
          ))}
          {schedules.map((item, idx) => (
            <S.ScheduleItem
              key={idx}
              top={(item.range.start * 100) / (24 * 60)}
              height={((item.range.end - item.range.start) * 100) / (24 * 60)}
              onClick={() => {
                console.log('@@item', item)
                timeSelectorRef.current?.showModal(item)
              }}
            >
              {item.content}
            </S.ScheduleItem>
          ))}
        </S.Plans>

        <S.Reals>
          {real.map((item) => (
            <S.RealItem key={item}>
              <span>실제</span>
            </S.RealItem>
          ))}
        </S.Reals>
        <TimeSelector ref={timeSelectorRef} onDialogClose={saveSchedule} />
      </S.Container>
    </>
  )
}

export default TodayGrid

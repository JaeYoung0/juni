import { useCalendarAtom } from '@/domain/calendar'
import { PlanItem, usePlanList } from '@/domain/plan'
import dayjs from 'dayjs'
import { useRef } from 'react'
import PracticeDialog, { PracticeDialogRefType } from '../PracticeDialog'
import PlanDialog, { PlanDialogRefType } from '../PlanDialog'

import * as S from './style'
import { usePracticeList } from '@/domain/practice'

const LENGTH = 24

function TodayGrid() {
  const [currentUnix] = useCalendarAtom()

  return (
    <>
      <S.CurrentUnix>
        {`< `}선택 날짜: {dayjs.unix(currentUnix).format('YYYY-MM-DD')}
        {` >`}
      </S.CurrentUnix>

      <S.VacantArea />
      <S.Grid>
        <TimeCol />
        <PlanCol />
        <PracticeCol />
      </S.Grid>
    </>
  )
}

function TimeCol() {
  const bases = Array.from({ length: LENGTH }, (v, i) => i)

  return (
    <S.Times>
      {bases.map((item) => (
        <S.Time className="time" key={item}>
          <span>{item}시</span>
        </S.Time>
      ))}
    </S.Times>
  )
}

function PlanCol() {
  const bases = Array.from({ length: LENGTH }, (v, i) => i + 1)
  const { data: plans } = usePlanList()

  const planDialogRef = useRef<PlanDialogRefType | null>(null)

  const handlePlanBaseClick = () => planDialogRef.current?.showModal()

  const handlePlanItemClick = (item: PlanItem) => {
    planDialogRef.current?.showModal(item)
  }

  return (
    <S.Plans>
      {bases.map((item) => (
        <S.Plan key={item} onClick={handlePlanBaseClick} />
      ))}
      {plans?.map((item, idx) => {
        const top = (item.startTime * 100) / (24 * 60)
        const height = ((item.endTime - item.startTime) * 100) / (24 * 60)
        return (
          <S.PlanItem key={idx} top={top} height={height} onClick={() => handlePlanItemClick(item)}>
            <span>{item.content}</span>
          </S.PlanItem>
        )
      })}
      <PlanDialog ref={planDialogRef} />
    </S.Plans>
  )
}

function PracticeCol() {
  const bases = Array.from({ length: LENGTH }, (v, i) => i + 1)
  const practiceDialogRef = useRef<PracticeDialogRefType | null>(null)
  const handlePracticeBaseClick = () => {
    practiceDialogRef.current?.showModal()
  }
  const handlePracticeItemClick = (item: PlanItem) => {
    practiceDialogRef.current?.showModal(item)
  }

  const { data: practices } = usePracticeList()

  return (
    <S.PracticeList>
      {bases.map((item) => (
        <S.PracticeBaseCell key={item} onClick={handlePracticeBaseClick} />
      ))}
      {practices?.map((item, idx) => {
        const top = (item.startTime * 100) / (24 * 60)
        const height = ((item.endTime - item.startTime) * 100) / (24 * 60)
        return (
          <S.PracticeItem
            key={idx}
            top={top}
            height={height}
            onClick={() => handlePracticeItemClick(item)}
          >
            <span>{item.content}</span>
          </S.PracticeItem>
        )
      })}
      <PracticeDialog ref={practiceDialogRef} />
    </S.PracticeList>
  )
}

export default TodayGrid

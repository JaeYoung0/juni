import { useCalendarAtom } from '@/domain/calendar'
import { PlanItem, usePlanList } from '@/domain/plan'
import dayjs from 'dayjs'
import { useEffect, useMemo, useRef, useState } from 'react'
import PracticeDialog, { PracticeDialogRefType } from '../PracticeDialog'
import PlanDialog, { PlanDialogRefType } from '../PlanDialog'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'
import * as S from './style'
import { PracticeItem, usePracticeList } from '@/domain/practice'

const LENGTH = 24

function TodayGrid() {
  const [currentUnix] = useCalendarAtom()
  const { data: planList } = usePlanList()

  // TODO. refactor
  const calculatedHour = useMemo(() => {
    let min = Number.MAX_SAFE_INTEGER
    let result = 0

    planList?.forEach((planItem) => {
      if (planItem.startTime < min) {
        min = planItem.startTime
      }
      result = min
    })

    return result / 60
  }, [planList])

  const [firstStartHour, setFirstStartHour] = useState(0)

  useEffect(() => {
    setFirstStartHour(calculatedHour)
  }, [planList])

  return (
    <>
      <S.CurrentUnix>
        {`< `}선택 날짜: {dayjs.unix(currentUnix).format('YYYY-MM-DD')}
        {` >`}
      </S.CurrentUnix>

      <S.GridToggleBtn
        onClick={() => {
          if (!firstStartHour) {
            setFirstStartHour(calculatedHour)
          } else {
            setFirstStartHour(0)
          }
        }}
      >
        {firstStartHour ? <UnfoldMoreIcon /> : <UnfoldLessIcon />}
      </S.GridToggleBtn>
      <S.GridWrapper firstHour={firstStartHour}>
        <S.Grid firstHour={firstStartHour}>
          <TimeCol />
          <PlanCol />
          <PracticeCol />
        </S.Grid>
      </S.GridWrapper>
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
  const { data: planList } = usePlanList()
  console.log('@@planList', planList)

  const planDialogRef = useRef<PlanDialogRefType | null>(null)

  const handlePlanBaseClick = () => planDialogRef.current?.showModal()

  const handlePlanItemClick = (item: PlanItem) => {
    planDialogRef.current?.showModal(item)
  }

  return (
    <S.Plans>
      {bases.map((_, idx) => (
        <S.Plan key={idx} onClick={handlePlanBaseClick} />
      ))}
      {planList?.map((item, idx) => {
        const { startTime, endTime, content, color } = item
        const top = (item.startTime * 100) / (24 * 60)

        // TODO. 중복 코드 어디에 모을까
        const getHeight = () => {
          // endTime이 자정일 때
          let _endTime = endTime
          if (startTime > endTime && endTime === 0) {
            _endTime = 24 * 60
          }
          return (Math.abs(_endTime - startTime) / (24 * 60)) * 100
        }
        const height = getHeight()

        return (
          <S.PlanItem
            style={{ background: color }}
            key={idx}
            top={top}
            height={height}
            onClick={() => handlePlanItemClick(item)}
          >
            <span>{content}</span>
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
  const handlePracticeItemClick = (item: PracticeItem) => {
    practiceDialogRef.current?.showModal(item)
  }

  const { data: practiceList } = usePracticeList()
  console.log('@@practiceList', practiceList)

  return (
    <S.PracticeList>
      {bases.map((item) => (
        <S.PracticeBaseCell key={item} onClick={handlePracticeBaseClick} />
      ))}
      {practiceList?.map((item, idx) => {
        const { startTime, endTime, color, content } = item
        const top = (startTime * 100) / (24 * 60)

        const getHeight = () => {
          // endTime이 자정일 때
          let _endTime = endTime
          if (startTime > endTime && endTime === 0) {
            _endTime = 24 * 60
          }
          return (Math.abs(_endTime - startTime) / (24 * 60)) * 100
        }

        const height = getHeight()

        return (
          <S.PracticeItem
            style={{ background: color }}
            key={idx}
            top={top}
            height={height}
            onClick={() => handlePracticeItemClick(item)}
          >
            <span>{content}</span>
          </S.PracticeItem>
        )
      })}
      <PracticeDialog ref={practiceDialogRef} />
    </S.PracticeList>
  )
}

export default TodayGrid

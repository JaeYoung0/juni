import { useCalendarAtom } from '@/domain/calendar'
import { getStartTimeOfPlanList, PlanItem, usePlanList } from '@/domain/plan'
import dayjs from 'dayjs'
import { useEffect, useMemo, useRef, useState } from 'react'
import PracticeDialog, { PracticeDialogRefType } from '../PracticeDialog'
import PlanDialog, { PlanDialogRefType } from '../PlanDialog'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'
import * as S from './style'
import { PracticeItem, usePracticeList } from '@/domain/practice'
import { getItemHeight } from '@/lib/utils'
import useHorizontalSwipe from '@/hooks/useHorizontalSwipe'

const LENGTH = 24
// schedule = plan + practice
export default function ScheduleGrid() {
  const [currentUnix] = useCalendarAtom()
  const { data: planList } = usePlanList()
  const startTimeOfFirstPlanItem = useMemo(() => getStartTimeOfPlanList(planList ?? []), [planList])
  const [firstStartHour, setFirstStartHour] = useState(0)

  useEffect(() => {
    setFirstStartHour(startTimeOfFirstPlanItem)
  }, [planList])

  const handleClickGridToggle = () =>
    setFirstStartHour(firstStartHour === 0 ? startTimeOfFirstPlanItem : 0)

  const practiceDialogRef = useRef<PracticeDialogRefType | null>(null)

  useEffect(() => {
    const handleCustomEvent = (e: CustomEventInit<PlanItem>) => {
      console.log('@@e', e)

      if (e.detail) {
        const { content, ...rest } = e.detail

        practiceDialogRef.current?.showModal(rest)
      }
    }
    document.addEventListener('detectPlanItemMove', handleCustomEvent)
    return () => document.removeEventListener('detectPlanItemMove', handleCustomEvent)
  }, [])

  return (
    <>
      <S.CurrentUnix>
        {`< `}선택 날짜: {dayjs.unix(currentUnix).format('YYYY-MM-DD')}
        {` >`}
      </S.CurrentUnix>

      <S.GridToggleBtn onClick={handleClickGridToggle}>
        {firstStartHour ? <UnfoldMoreIcon /> : <UnfoldLessIcon />}
      </S.GridToggleBtn>
      <S.GridWrapper firstHour={firstStartHour}>
        <S.Grid firstHour={firstStartHour}>
          <TimeCol />
          <PlanCol />
          <PracticeCol />
        </S.Grid>
      </S.GridWrapper>
      <PracticeDialog ref={practiceDialogRef} />
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

  const handlePlanBaseClick = (startTime: number) =>
    planDialogRef.current?.showModal({ startTime: startTime * 60, endTime: (startTime + 1) * 60 })

  const handleClickPlanItem = (item: PlanItem) => {
    planDialogRef.current?.showModal(item)
  }

  return (
    <S.Plans>
      {bases.map((_, idx) => (
        <S.PlanBaseCell key={idx} onClick={() => handlePlanBaseClick(idx)} />
      ))}
      {planList?.map((item, idx) => {
        const { startTime, endTime } = item
        const top = (item.startTime * 100) / (24 * 60)

        const height = getItemHeight(startTime, endTime)

        return (
          <PlanItem
            key={item.id}
            item={item}
            top={top}
            height={height}
            onClickPlanItem={handleClickPlanItem}
          />
        )
      })}
      <PlanDialog ref={planDialogRef} />
    </S.Plans>
  )
}

type PlanItemProps = {
  top: number
  height: number
  item: PlanItem
  onClickPlanItem: (item: PlanItem) => void
}
function PlanItem({ ...props }: PlanItemProps) {
  const { top, height, item } = props

  const handleRightSwipe = (item: PlanItem) => {
    const planItemMoveEvent = new CustomEvent('detectPlanItemMove', {
      detail: item,
    })
    document.dispatchEvent(planItemMoveEvent)
  }

  const { onTouchStart, onTouchMove, onTouchEnd } = useHorizontalSwipe({
    onRightSwipe: () => handleRightSwipe(item),
  })

  return (
    <S.PlanItem
      style={{ background: item.color }}
      top={top}
      height={height}
      onClick={() => props.onClickPlanItem(item)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <span>{item.content}</span>
    </S.PlanItem>
  )
}

function PracticeCol() {
  const bases = Array.from({ length: LENGTH }, (v, i) => i + 1)
  const practiceDialogRef = useRef<PracticeDialogRefType | null>(null)
  const handlePracticeBaseClick = (startTime: number) => {
    practiceDialogRef.current?.showModal({
      startTime: startTime * 60,
      endTime: (startTime + 1) * 60,
    })
  }
  const handlePracticeItemClick = (item: PracticeItem) => {
    practiceDialogRef.current?.showModal(item)
  }

  const { data: practiceList } = usePracticeList()
  console.log('@@practiceList', practiceList)

  return (
    <S.PracticeList>
      {bases.map((_, idx) => (
        <S.PracticeBaseCell key={idx} onClick={() => handlePracticeBaseClick(idx)} />
      ))}
      {practiceList?.map((item, idx) => {
        const { startTime, endTime, color, content } = item
        const top = (startTime * 100) / (24 * 60)

        const height = getItemHeight(startTime, endTime)

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

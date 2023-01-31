import { useCalendarAtom } from '@/domain/calendar'
import { PlanItem, usePlanItemAtom, usePlanList } from '@/domain/plan'
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react'

import * as S from './style'
import { getEndTime, getItemHeight, minParser, unixToUTC } from '@/lib/utils'
import useHorizontalSwipe from '@/hooks/useHorizontalSwipe'
import useDialog from '@/hooks/useDialog'
import { PracticeItem, usePracticeItemAtom, usePracticeList } from '@/domain/practice'
import { useCategoryList } from '@/domain/category'
import { css } from '@emotion/react'

const LENGTH = 24
// ScheduleGrid = Time + Plan + Practice
export default function ScheduleGrid() {
  const currentMinutes = dayjs().get('h') * 60 + dayjs().get('m')
  const timeLineRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    timeLineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [timeLineRef.current])

  return (
    <>
      <S.GridWrapper>
        <S.Grid>
          <S.CurrentTimeLine
            ref={timeLineRef}
            css={css`
              top: calc((${currentMinutes} / (24 * 60)) * 100%);
            `}
          />
          <PlanCol />
          <TimeCol />
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
          <span>{item}</span>
        </S.Time>
      ))}
    </S.Times>
  )
}

function PlanCol() {
  const bases = Array.from({ length: LENGTH }, (v, i) => i + 1)
  const { data: planList } = usePlanList()

  const [planItemAtom, setPlanItemAtom] = usePlanItemAtom()
  const [currentUnix] = useCalendarAtom()
  const { openDialog } = useDialog()

  const handleClickPlanBase = (hour: number) => {
    setPlanItemAtom({
      ...planItemAtom,
      startTime: unixToUTC(currentUnix).add(hour, 'h').format(),
      endTime: getEndTime({ currentUnix, hour }),
    })
    openDialog({
      variant: 'CreatePlanDialog',
      props: {},
    })
  }

  const handleClickPlanItem = (item: PlanItem) => {
    setPlanItemAtom({
      ...item,
      startTime: item.startTime,
      endTime: item.endTime,
    })
    openDialog({
      variant: 'UpdatePlanDialog',
      props: {},
    })
  }

  return (
    <S.PlanList>
      {bases.map((_, idx) => (
        <S.PlanBaseCell key={idx} onClick={() => handleClickPlanBase(idx)} />
      ))}
      {planList?.map((item) => {
        const { startTime, endTime } = item
        const _startTime = minParser(startTime)
        const _endTime = minParser(endTime)
        const top = (_startTime * 100) / (24 * 60)
        const height = getItemHeight(_startTime, _endTime)

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
    </S.PlanList>
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
  const { openDialog } = useDialog()
  const [_, setPracticeItemAtom] = usePracticeItemAtom()

  const handleRightSwipePlan = (item: PlanItem) => {
    // plan to practice
    setPracticeItemAtom(item)
    openDialog({ variant: 'CreatePracticeDialog', props: {} })
  }

  const { onTouchStart, onTouchMove, onTouchEnd } = useHorizontalSwipe({
    onRightSwipe: () => handleRightSwipePlan(item),
  })

  const { data: categoryList } = useCategoryList()
  const category = categoryList?.find((c) => c.categoryId === item.categoryId)

  return (
    <S.PlanItem
      style={{ background: category?.color ?? '#aaa' }}
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
  const { data: practiceList } = usePracticeList()

  const [praticeItemAtom, setPracticeItemAtom] = usePracticeItemAtom()

  const [currentUnix] = useCalendarAtom()
  const { openDialog } = useDialog()

  const handleClickPracticeBase = (hour: number) => {
    setPracticeItemAtom({
      ...praticeItemAtom,
      startTime: unixToUTC(currentUnix).add(hour, 'h').format(),
      endTime: getEndTime({ currentUnix, hour }),
    })
    openDialog({
      variant: 'CreatePracticeDialog',
      props: {},
    })
  }

  const handleClickPracticeItem = (item: PracticeItem) => {
    setPracticeItemAtom({
      ...item,
      startTime: item.startTime,
      endTime: item.endTime,
    })
    openDialog({
      variant: 'UpdatePracticeDialog',
      props: {},
    })
  }

  return (
    <S.PracticeList>
      {bases.map((_, idx) => (
        <S.PracticeBaseCell key={idx} onClick={() => handleClickPracticeBase(idx)} />
      ))}
      {practiceList?.map((item, idx) => {
        const { startTime, endTime, content } = item
        const _startTime = minParser(startTime)
        const _endTime = minParser(endTime)
        const top = (_startTime * 100) / (24 * 60)

        const height = getItemHeight(_startTime, _endTime)

        return (
          <PracticeItem
            key={item.id}
            top={top}
            height={height}
            item={item}
            onClickPracticeItem={handleClickPracticeItem}
          />
        )
      })}
    </S.PracticeList>
  )
}

type PracticeItemProps = {
  top: number
  height: number
  item: PracticeItem
  onClickPracticeItem: (item: PracticeItem) => void
}
function PracticeItem({ ...props }: PracticeItemProps) {
  const { top, height, item } = props

  const { data: categoryList } = useCategoryList()
  const category = categoryList?.find((c) => c.categoryId === item.categoryId)

  return (
    <S.PracticeItem
      style={{ background: category?.color ?? '#aaa' }}
      top={top}
      height={height}
      onClick={() => props.onClickPracticeItem(item)}
    >
      <span>{item.content}</span>
    </S.PracticeItem>
  )
}

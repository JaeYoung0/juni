import { useCalendarAtom } from '@/domain/calendar'
import { getStartTimeOfPlanList, PlanItem, usePlanItemAtom, usePlanList } from '@/domain/plan'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'
import * as S from './style'
import { getItemHeight, minParser, unixToUTC, utcParser } from '@/lib/utils'
import useHorizontalSwipe from '@/hooks/useHorizontalSwipe'
import useDialogList from '@/hooks/useDialogList'
import { PracticeItem, usePracticeItemAtom, usePracticeList } from '@/domain/practice'

const LENGTH = 24
// ScheduleGrid = Time + Plan + Practice
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

  return (
    <>
      <S.CurrentUnix>선택한 날짜: {dayjs.unix(currentUnix).format('YYYY-MM-DD')}</S.CurrentUnix>

      <S.GridToggleBtn onClick={handleClickGridToggle}>
        {/* <span>Toggle</span> */}
        {firstStartHour ? <UnfoldMoreIcon /> : <UnfoldLessIcon />}
      </S.GridToggleBtn>
      <S.GridWrapper firstHour={firstStartHour}>
        <S.Grid firstHour={firstStartHour}>
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
  const { openDialog } = useDialogList()

  const handleClickPlanBase = (hour: number) => {
    setPlanItemAtom({
      ...planItemAtom,
      startTime: unixToUTC(currentUnix).add(hour, 'h').format(),
      endTime: unixToUTC(currentUnix)
        .add(hour + 1, 'h')
        .format(),
    })
    openDialog({
      variant: 'CreatePlanDialog',
      props: {},
    })
  }

  const handleClickPlanItem = (item: PlanItem) => {
    setPlanItemAtom({
      ...item,
      startTime: utcParser(item.startTime, currentUnix),
      endTime: utcParser(item.endTime, currentUnix),
    })
    openDialog({
      variant: 'UpdatePlanDialog',
      props: {},
    })
  }

  return (
    <S.Plans>
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
  const { openDialog } = useDialogList()
  const [_, setPracticeItemAtom] = usePracticeItemAtom()

  const handleRightSwipePlan = (item: PlanItem) => {
    setPracticeItemAtom({ ...item })
    openDialog({ variant: 'CreatePracticeDialog', props: {} })
  }

  const { onTouchStart, onTouchMove, onTouchEnd } = useHorizontalSwipe({
    onRightSwipe: () => handleRightSwipePlan(item),
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
  const { data: practiceList } = usePracticeList()
  const [praticeItemAtom, setPracticeItemAtom] = usePracticeItemAtom()

  const [currentUnix] = useCalendarAtom()
  const { openDialog } = useDialogList()

  const handleClickPracticeBase = (hour: number) => {
    setPracticeItemAtom({
      ...praticeItemAtom,
      startTime: unixToUTC(currentUnix).add(hour, 'h').format(),
      endTime: unixToUTC(currentUnix)
        .add(hour + 1, 'h')
        .format(),
    })
    openDialog({
      variant: 'CreatePracticeDialog',
      props: {},
    })
  }

  const handleClickPracticeItem = (item: PracticeItem) => {
    setPracticeItemAtom({
      ...item,
      startTime: utcParser(item.startTime, currentUnix),
      endTime: utcParser(item.endTime, currentUnix),
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
        const { startTime, endTime, color, content } = item
        const _startTime = minParser(startTime)
        const _endTime = minParser(endTime)
        const top = (_startTime * 100) / (24 * 60)

        const height = getItemHeight(_startTime, _endTime)

        return (
          <S.PracticeItem
            style={{ background: color }}
            key={idx}
            top={top}
            height={height}
            onClick={() => handleClickPracticeItem(item)}
          >
            <span>{content}</span>
          </S.PracticeItem>
        )
      })}
    </S.PracticeList>
  )
}

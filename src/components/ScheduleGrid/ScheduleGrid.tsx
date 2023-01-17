import { useCalendarAtom } from '@/domain/calendar'
import { getStartTimeOfPlanList, PlanItem, usePlanItemAtom, usePlanList } from '@/domain/plan'
import dayjs from 'dayjs'
import { useEffect, useMemo, useRef, useState } from 'react'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess'
import * as S from './style'
import { getItemHeight, isNumeric, totalMinParser, unixToUTC } from '@/lib/utils'
import useHorizontalSwipe from '@/hooks/useHorizontalSwipe'
import useDialogList from '@/hooks/useDialogList'
import { usePracticeList } from '@/domain/practice'

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
          {/* <PracticeCol /> */}
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

  const [planItemAtom, setPlanItemAtom] = usePlanItemAtom()
  console.log('@@planItemAtom', planItemAtom)

  const { openDialog } = useDialogList()
  const [currentUnix] = useCalendarAtom()

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
    setPlanItemAtom(item)
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
      {planList?.map((item, idx) => {
        const { startTime, endTime } = item
        console.log('@@item', item)

        const _startTime = totalMinParser(startTime)
        const _endTime = totalMinParser(endTime)

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

// function PracticeCol() {
//   const bases = Array.from({ length: LENGTH }, (v, i) => i + 1)
//   const handlePracticeBaseClick = (startTime: number) => {

//   }
//   const handleClickPracticeItem = (item: PracticeItem) => {
//     // practiceDialogRef.current?.showModal(item)
//   }

//   const { data: practiceList } = usePracticeList()

//   // console.log('@@practiceList', practiceList)

//   return (
//     <S.PracticeList>
//       {bases.map((_, idx) => (
//         <S.PracticeBaseCell key={idx} onClick={() => handleClickPracticeItem(idx)} />
//       ))}
//       {practiceList?.map((item, idx) => {
//         const { startTime, endTime, color, content } = item
//         const top = (startTime * 100) / (24 * 60)

//         const height = getItemHeight(startTime, endTime)

//         return (
//           <S.PracticeItem
//             style={{ background: color }}
//             key={idx}
//             top={top}
//             height={height}
//             onClick={() => handlePracticeItemClick(item)}
//           >
//             <span>{content}</span>
//           </S.PracticeItem>
//         )
//       })}
//     </S.PracticeList>
//   )
// }

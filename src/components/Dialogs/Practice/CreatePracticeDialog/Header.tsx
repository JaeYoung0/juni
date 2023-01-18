import { PlanItem } from '@/domain/plan'
import { PracticeItem } from '@/domain/practice'
import { SetterOrUpdater } from 'recoil'
import * as CS from '@/components/Dialogs/Plan/common.style'

// BodyProps와 동일
type Props<T extends PlanItem | PracticeItem> = {
  item: T
  setItem: SetterOrUpdater<T>
}
export default function Header({ item, setItem }: Props<PlanItem | PracticeItem>) {
  return <CS.HeaderName>{item.title ? `[스케줄 수정]` : `[스케줄 추가]`} </CS.HeaderName>
}

import { CategoryItem } from '@/domain/category'
import { DayChartItem } from '@/domain/chart'
import { User } from '@/domain/user'
import { firestore } from '@/lib/firebase'
import { unixToYYYYMMDD } from '@/lib/utils'
import { collection, query, getDocs, collectionGroup, where } from 'firebase/firestore/lite'
import { PLAN_CHART_SUBCOLLECTION_NAME } from './plan'
import { PRACTICE_CHART_SUBCOLLECTION_NAME } from './practice'

export const COLLECTION_NAME_CHART = 'chart'

export type GetDayChartItemPayload = Pick<User, 'userId'> & Pick<CategoryItem, 'categoryId'>
export const getDayChartItems = async (payload: GetDayChartItemPayload) => {
  const { categoryId } = payload

  const planChartRef = collectionGroup(firestore, PLAN_CHART_SUBCOLLECTION_NAME)
  const praticeChartRef = collectionGroup(firestore, PRACTICE_CHART_SUBCOLLECTION_NAME)

  const [planChart, praticeChart] = await Promise.all([
    getDocs(query(planChartRef, where('categoryId', '==', categoryId))),
    getDocs(query(praticeChartRef, where('categoryId', '==', categoryId))),
  ])

  const planChartList: DayChartItem[] = []
  planChart.forEach((item) => {
    const dayChartItem = {
      ...item.data(),
      id: item.id, // db 생성시 만들어진 id로 대체
    }

    planChartList.push(dayChartItem as DayChartItem)
  })

  const praticeChartList: DayChartItem[] = []
  praticeChart.forEach((item) => {
    const dayChartItem = {
      ...item.data(),
      id: item.id, // db 생성시 만들어진 id로 대체
    }

    praticeChartList.push(dayChartItem as DayChartItem)
  })

  return {
    plan: planChartList,
    practice: praticeChartList,
  }
}

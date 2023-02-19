import withAuth from '@/hoc/withAuth'
import BasicLayout from '@/components/layouts/BasicLayout'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import CategorySelector from './CategorySelector'
import { useForm } from 'react-hook-form'
import CategoryChart from './CategoryChart'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function ChartPage() {
  const { register, watch } = useForm()
  const categoryId = watch('categoryId')

  return (
    <BasicLayout>
      <CategorySelector {...register('categoryId')} />
      <CategoryChart categoryId={categoryId} />
    </BasicLayout>
  )
}

export default withAuth(ChartPage)

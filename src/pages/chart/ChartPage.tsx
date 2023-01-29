import withAuth from '@/application/withAuth'
import BasicLayout from '@/components/layouts/BasicLayout'
import { useCategoryList } from '@/domain/category'
import { useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useChart } from '@/domain/chart'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { convertHexToRGBA } from '@/lib/utils'
import { css } from '@emotion/react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
}

function ChartPage() {
  const { data: categoryList } = useCategoryList()
  const [categoryId, setCategoryId] = useState('')
  const current = categoryList?.find((item) => item.categoryId === categoryId)

  const handleChange = (e: SelectChangeEvent) => {
    setCategoryId(e.target.value)
  }

  const { data: chartList } = useChart({ categoryId })

  const data = {
    labels: chartList?.plan.map((item) => dayjs(item.startTime).format('MM/DD')),
    datasets: [
      {
        label: '계획시간',
        data: chartList?.plan.map((item) => item.minutes / 60),
        backgroundColor: convertHexToRGBA(current?.color ?? '#aaa', 0.3),
      },
      {
        label: '실행시간',
        data: chartList?.practice.map((item) => item.minutes / 60),
        backgroundColor: current?.color,
      },
    ],
  }

  console.log('@@current', current, chartList)

  const totalPlanDuration = chartList?.plan.reduce((acc, cur) => acc + cur.minutes, 0) ?? 0
  const { hh: planHH, mm: planMM } = mmTohhmm(totalPlanDuration)

  const totalPraticeDuration = chartList?.practice.reduce((acc, cur) => acc + cur.minutes, 0) ?? 0
  const { hh: practiceHH, mm: practiceMM } = mmTohhmm(totalPraticeDuration)

  return (
    <BasicLayout>
      {/* 카테고리 선택 */}
      <FormControl sx={{ minWidth: 100, background: current ? current.color : '#fff' }}>
        <InputLabel id="category-label">카테고리</InputLabel>
        <Select
          labelId="category-label"
          value={categoryId}
          onChange={handleChange}
          autoWidth
          label="Age"
        >
          {categoryList?.map((item) => (
            <MenuItem
              key={item.categoryId}
              value={item.categoryId}
              style={{ background: item.color }}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 차트 */}

      {current && (chartList?.plan.length ?? 0) > 0 ? (
        <>
          <Bar title={`${current?.name} 통계`} options={options} data={data} />
          <p
            css={css`
              font-size: 1.6rem;
              color: #fff;
              padding: 1rem;
              white-space: pre-wrap;
              line-height: 1.5;
            `}
          >
            {`${
              current.name
            }카테고리를 분석결과,\n계획시간 ${planHH}시 ${planMM}분 대비 실행시간 ${practiceHH}시간 ${practiceMM}분을 달성했습니다!\n달성률:${Math.floor(
              (totalPraticeDuration * 100) / totalPlanDuration
            )}%`}
          </p>
        </>
      ) : (
        <p
          css={css`
            font-size: 1.6rem;
            color: #fff;
            padding: 1rem;
            white-space: pre-wrap;
            line-height: 1.5;
          `}
        >
          해당 카테고리에 대한 계획 데이터가 없습니다.
        </p>
      )}
    </BasicLayout>
  )
}

export default withAuth(ChartPage)

function mmTohhmm(min: number) {
  return {
    hh: Math.floor(min / 60),
    mm: min % 60,
  }
}

import { useChart } from '@/domain/chart'
import dayjs from 'dayjs'
import { convertHexToRGBA } from '@/lib/utils'
import { Bar } from 'react-chartjs-2'

import { css } from '@emotion/react'
import { useCategoryStore } from '@/service/categoryAdapter'

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
}

function CategoryChart({ categoryId }: { categoryId: string }) {
  const { categoryList } = useCategoryStore()
  const { data: chartList } = useChart({ categoryId })

  const current = categoryList?.find((item) => item.categoryId === categoryId)

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

  const totalPlanDuration = chartList?.plan.reduce((acc, cur) => acc + cur.minutes, 0) ?? 0
  const { hh: planHH, mm: planMM } = mmTohhmm(totalPlanDuration)

  const totalPraticeDuration = chartList?.practice.reduce((acc, cur) => acc + cur.minutes, 0) ?? 0
  const { hh: practiceHH, mm: practiceMM } = mmTohhmm(totalPraticeDuration)

  return (
    <>
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
    </>
  )
}

export default CategoryChart

function mmTohhmm(min: number) {
  return {
    hh: Math.floor(min / 60),
    mm: min % 60,
  }
}

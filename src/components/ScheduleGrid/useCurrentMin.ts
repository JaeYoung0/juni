import useInterval from '@/hooks/useInterval'
import dayjs from 'dayjs'
import { useState } from 'react'

export default function useCurrentMin() {
  const [currentMin, setCurrentMin] = useState(dayjs().get('h') * 60 + dayjs().get('m'))

  useInterval(() => setCurrentMin((prev) => prev + 1), 60 * 1000)

  return currentMin
}

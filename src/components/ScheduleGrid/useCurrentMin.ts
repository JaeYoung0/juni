import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export default function useCurrentMin() {
  const [currentMin, setCurrentMin] = useState(() => dayjs().get('h') * 60 + dayjs().get('m'))

  useEffect(() => {
    window.setInterval(() => {
      setCurrentMin((prev) => prev + 1)
    }, 60 * 1000)
  }, [])

  return currentMin
}

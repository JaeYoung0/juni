import React, { useState } from 'react'

type Params = {
  onLeftSwipe?: () => void
  onRightSwipe?: () => void
  onUpperSwipe?: () => void
  onDownSwipe?: () => void
}
// 스와이프 방향 상하좌우 우선권을 구분하기 위해서 useHorizontalSwipe와 useVerticalSwipe를 구분한다.
function useSwipe({ onLeftSwipe, onRightSwipe, onUpperSwipe, onDownSwipe }: Params) {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 })

  const MIN_DISTANCE = 50

  const onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setTouchEnd({
      x: 0,
      y: 0,
    })

    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const onTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const onTouchEnd = () => {
    if (!touchStart.x || !touchStart.y || !touchEnd.x || !touchEnd.y) return

    const distance_x = touchStart.x - touchEnd.x
    const distance_y = touchStart.y - touchEnd.y

    const isLeftSwipe = distance_x > MIN_DISTANCE
    const isRightSwipe = distance_x < -MIN_DISTANCE
    const isUpperSwipe = distance_y > MIN_DISTANCE
    const isDownSwipe = distance_y < -MIN_DISTANCE

    if (isLeftSwipe) {
      onLeftSwipe?.()
    } else if (isRightSwipe) {
      onRightSwipe?.()
    } else if (isUpperSwipe) {
      onUpperSwipe?.()
    } else if (isDownSwipe) {
      onDownSwipe?.()
    }
  }
  return { onTouchStart, onTouchMove, onTouchEnd }
}

export default useSwipe

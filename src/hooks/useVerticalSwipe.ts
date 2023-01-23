import React, { useState } from 'react'

type Params = {
  onUpSwipe?: () => void
  onDownSwipe?: () => void
}
// 스와이프 방향 상하좌우 우선권을 구분하기 위해서 useHorizontalSwipe와 useVerticalSwipe를 구분한다.
function useVerticalSwipe({ onUpSwipe, onDownSwipe }: Params) {
  const [touchStart, setTouchStart] = useState<number>(0)
  const [touchEnd, setTouchEnd] = useState<number>(0)

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setTouchEnd(0) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent<HTMLElement>) => setTouchEnd(e.targetTouches[0].clientY)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isDownSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      onUpSwipe?.()
    } else if (isDownSwipe) {
      onDownSwipe?.()
    }
  }
  return { onTouchStart, onTouchMove, onTouchEnd }
}

export default useVerticalSwipe

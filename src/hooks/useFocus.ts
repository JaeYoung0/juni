import { useCallback } from 'react'

function useFocus() {
  return useCallback((el: HTMLElement | null) => el?.focus(), [])
}

export default useFocus

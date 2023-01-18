import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import React, { useEffect, useRef } from 'react'

function WithDialog(Component: (props: any) => EmotionJSX.Element) {
  // const ref = useRef<HTMLDialogElement | null>(null)
  // const open = () => ref.current?.showModal()
  // useEffect(() => {
  //   !ref.current?.open ? open() : close()
  // }, [])
  // return (
  //   <dialog ref={ref} style={{ height: '200px' }}>
  //     <Component />
  //   </dialog>
  // )
}

export default WithDialog

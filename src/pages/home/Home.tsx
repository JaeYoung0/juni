import BasicLayout from '@/components/layouts/BasicLayout'
import { css } from '@emotion/react'

export default function HomePage() {
  return (
    <BasicLayout>
      <img
        src="https://images.unsplash.com/photo-1639678349533-5758a710ca0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        css={css`
          opacity: 0.4;
        `}
      />
      <span>index</span>
    </BasicLayout>
  )
}

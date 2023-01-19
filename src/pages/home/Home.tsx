import { NAV_HEIGHT } from '@/components/BottomNavigation/BottomNavigation'
import BasicLayout from '@/components/layouts/BasicLayout'
import { css } from '@emotion/react'

export default function HomePage() {
  return (
    <BasicLayout>
      <img
        src="https://images.unsplash.com/photo-1639678349533-5758a710ca0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        css={css`
          opacity: 0.4;
          height: calc(
            var(--vh) * 100 - ${NAV_HEIGHT}
          ); // TODO. main height fit size는 global에 변수로 저장하기
        `}
      />

      <p
        css={css`
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);

          font-size: 1.6rem;
          color: #fff;
        `}
      >
        구성 중입니다 : )
      </p>
    </BasicLayout>
  )
}

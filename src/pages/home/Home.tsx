import { NAV_HEIGHT } from '@/components/BottomNavigation/BottomNavigation'
import BasicLayout from '@/components/layouts/BasicLayout'
import withAuth from '@/hoc/withAuth'
import { useAphorismStore } from '@/service/aphorismAdapter'
import { useUserStore } from '@/service/userAdapter'
import { css } from '@emotion/react'
import { useState } from 'react'

function HomePage() {
  const { aphorism, setAphorism, aphorismList, createAphorismItem, deleteAphorismItem } =
    useAphorismStore()
  console.log('@@aphorismList', aphorismList)
  const [value, setvalue] = useState('')
  console.log('@@value', value)
  const { user } = useUserStore()
  const { userId } = user
  console.log('@@user', user)

  return (
    <BasicLayout>
      <div
        css={css`
          li {
            color: #fff;
            font-size: 2rem;
          }
        `}
      >
        {aphorismList?.map(({ aphorismId, text }) => (
          <>
            <li key={aphorismId}>{text}</li>
            <button
              onClick={() => {
                deleteAphorismItem({ userId, aphorismId })
              }}
            >
              삭제
            </button>
          </>
        ))}
      </div>

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

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!value) return
          createAphorismItem({ userId: user.userId, text: value, current: false })
          setvalue('')
        }}
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
        `}
      >
        <textarea
          value={value}
          onChange={(e) => {
            setvalue(e.target.value)
          }}
        />
        <button type="submit">경구 생성하기</button>
      </form>
    </BasicLayout>
  )
}

export default withAuth(HomePage)

{
  /* <img
src="https://images.unsplash.com/photo-1639678349533-5758a710ca0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
css={css`
  opacity: 0.4;
  width: 100%;
  height: calc(
    var(--vh) * 100 - ${NAV_HEIGHT}
  ); // TODO. main height fit size는 global에 변수로 저장하기
  object-fit: cover;
`}
/> */
}

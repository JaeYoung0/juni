import Calendar from '@/components/Calendar'
import { css } from '@emotion/react'
import React from 'react'

function Test() {
  return (
    <div>
      <Calendar />
      <p
        css={css`
          font-size: 10rem;
        `}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro temporibus, laboriosam sit
        explicabo ipsum aspernatur. Hic dicta temporibus odio suscipit assumenda dolorum sint,
        voluptas consequuntur praesentium ab, aspernatur, labore maiores.
      </p>
    </div>
  )
}

export default Test

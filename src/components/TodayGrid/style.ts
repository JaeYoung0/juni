import styled from '@emotion/styled'

export const Time = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;

  span {
    transform: translateY(50%);
    font-size: 1.4rem;
  }
`

// TODO Error: Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.
/* div > ${Time}{
} */

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr;
  padding: 0rem 0rem 5rem;

  div > div {
    width: 100%;
    min-height: 100px;
    background: #222222;

    border-right: 1px solid #aaa;
  }

  div:first-of-type > div {
    border-bottom: none;
  }
  div:not(:first-of-type) > div {
    border-bottom: 1px solid #aaa;
  }
`

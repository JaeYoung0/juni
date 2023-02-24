import { NAV_HEIGHT } from '@/components/BottomNavigation/BottomNavigation'

import styled from '@emotion/styled'

export const MyAphorism = styled.div`
  img {
    opacity: 0.25;
    width: 100%;
    height: calc(
      var(--vh) * 100 - ${NAV_HEIGHT}
    ); // TODO. main height fit size는 global에 변수로 저장하기
    object-fit: cover;
  }
`

export const AphorismText = styled.p`
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  font-size: 2rem;
  color: #fff;

  line-height: 2;
  text-align: center;

  white-space: pre-wrap;
  word-break: keep-all;
  padding: 0 1rem;
`

export const NoticeText = styled(AphorismText)``

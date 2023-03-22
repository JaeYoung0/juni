import { useEffect } from 'react'
import { firebaseAuth, useAuth } from '@/service/authAdapter'
import LoadingSpinner from '@/pages/home/loading'
import { css } from '@emotion/react'
import BasicLayout from '@/components/layouts/BasicLayout'

function Auth() {
  const { handleRedirect } = useAuth()

  useEffect(() => {
    handleRedirect()
  }, [])

  return (
    <BasicLayout
      bottomNavigation={false}
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <LoadingSpinner />
    </BasicLayout>
  )
}

export default Auth

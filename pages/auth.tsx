import { useEffect } from 'react'
import { firebaseAuth, useAuth } from '@/service/authAdapter'

function Auth() {
  const { handleRedirect } = useAuth()

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        handleRedirect()
      }
    })
  }, [])

  return <div>loading... auth</div>
}

export default Auth

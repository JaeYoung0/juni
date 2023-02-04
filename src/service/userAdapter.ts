import { useUserAtom } from './store'
import { UserStoreService } from '@/application/ports'

export function useUserStore(): UserStoreService {
  const [user, setUser] = useUserAtom()

  return {
    user,
    updateUser: (user) =>
      new Promise((resolve) => {
        setUser(user)
        resolve(user)
      }),
  }
}

import { useUserAtom } from './store'
import { UserStoreService } from '@/application/ports'

export function useUserStore(): UserStoreService {
  const [user, updateUser] = useUserAtom()
  return {
    user,
    updateUser,
  }
}

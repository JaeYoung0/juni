import { useUserAtom } from './store'
import { UserStorageService } from '@/application/ports'

export function useUserStore(): UserStorageService {
  const [userAtom, setUserAtom] = useUserAtom()

  return {
    user: userAtom,
    updateUser: setUserAtom,
  }
}

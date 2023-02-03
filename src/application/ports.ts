import { type User } from '@/domain/user'

export type UserStorageService = {
  user: User
  updateUser: (user: User) => void
}

import { CategoryItem } from '@/domain/category'
import { User } from '@/domain/user'

// 포트는 외부 서비스에 대한 인터페이스다.
// 인터페이스만 정의하고 세부사항은 service에서 구현한다. minimally coupled를 위함
// ISP원칙 적용 (Interface segregation principle)
export type UserStoreService = {
  user: User
  updateUser: (user: User) => void
}

export type AuthService = {
  isLoading: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
}

export type CreateCategoryItemPayload = Pick<User, 'userId'> & Omit<CategoryItem, 'categoryId'>
export type DeleteCategoryItemPayload = Pick<User, 'userId'> & Pick<CategoryItem, 'categoryId'>
export type CategoryStoreService = {
  category: CategoryItem
  createCategory: (payload: CreateCategoryItemPayload) => void
  updateCategory: (category: CategoryItem) => void // 클라이언트 상태를 ? 서버상태를 ?
  deleteCategory: (payload: DeleteCategoryItemPayload) => void
  categoryList: CategoryItem[] | undefined
}

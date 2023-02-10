import { CategoryItem } from '@/domain/category'
import { User } from '@/domain/user'
import * as Dialogs from '@/components/Dialogs'
import { AphorismItem } from '@/domain/aphorism'

// 포트는 외부 서비스에 대한 인터페이스다.
// 인터페이스만 정의하고 세부사항은 service에서 구현한다. minimally coupled를 위함
// ISP원칙 적용 (Interface segregation principle)
export type UserStoreService = {
  user: User
  updateUser: (user: User) => Promise<User>
}

export type AuthService = {
  isLoading: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
  handleRedirect: () => Promise<void>
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

export type DialogBasicProps = {
  close: () => void
}
export type DialogVariant = keyof typeof Dialogs
type Dialog = typeof Dialogs
type DialogProps<T extends DialogVariant> = React.ComponentProps<Dialog[T]>
type BasicPropKeys = keyof DialogBasicProps
export type DialogItem<V extends DialogVariant> = {
  variant: V
  props: Omit<DialogProps<V>, BasicPropKeys>
}
export type DialogService = {
  // 구조만 타입정의한대로 맞아떨어진다면, 뒤쪽 T에 "ActionDialog"라고 들어가면 앞쪽 T에도 똑같이 할당된다.
  openDialog: <T extends DialogVariant>(item: DialogItem<T>) => void
  dialogList: DialogItem<DialogVariant>[]
  updateDialogList: (list: DialogItem<DialogVariant>[]) => void
}

export type GetAphorismListPayload = Pick<User, 'userId'>
export type CreateAphorismItemPayload = Pick<User, 'userId'> & Omit<AphorismItem, 'aphorismId'>
export type UpdateAphorismItemPayload = Pick<User, 'userId'> &
  Pick<AphorismItem, 'aphorismId'> &
  Partial<AphorismItem>
export type DeleteAphorismItemPayload = Pick<User, 'userId'> & Pick<AphorismItem, 'aphorismId'>
export type GetCurrentAphorismItemPayload = Pick<User, 'userId'>
export type SaveCurrentAphorismItemPayload = Pick<User, 'userId'> & {
  prevId: string
  targetId: string
}

export type AphorismService = {
  aphorism: AphorismItem
  setAphorism: (payload: AphorismItem) => void
  createAphorismItem: (payload: CreateAphorismItemPayload) => void
  updateAphorismItem: (payload: UpdateAphorismItemPayload) => void
  deleteAphorismItem: (payload: DeleteAphorismItemPayload) => void
  aphorismList: AphorismItem[] | undefined
  saveCurrentAphorismItem: (payload: SaveCurrentAphorismItemPayload) => void
}

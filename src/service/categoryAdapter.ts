import { createCategoryItem, getCategoryItems, deleteCategoryItem } from '@/service/api/category'
import { CategoryStoreService } from './../application/ports'
import { useCategoryAtom } from './store'
import { useQuery } from '@tanstack/react-query'
import { useUserStore } from './userAdapter'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// 클라이언트 상태
export function useCategoryStore(): CategoryStoreService {
  const [category, updateCategory] = useCategoryAtom()
  const { data: categoryList } = useCategoryList()
  const create = useCreateCategoryItem()
  const remove = useDeleteCategoryItem()

  return {
    category,
    categoryList,
    updateCategory,
    createCategory: create.mutate,
    deleteCategory: remove.mutate,
  }
}

// 서버상태
const QUERY_KEY_HEAD = '@categoryList'
function useCategoryList() {
  const { user } = useUserStore()
  const { userId } = user
  return useQuery({
    queryKey: [QUERY_KEY_HEAD],
    queryFn: () => getCategoryItems({ userId }),
    refetchOnMount: false,
    enabled: !!userId,
    refetchOnWindowFocus: false,
  })
}

// 뮤테이션
function useCreateCategoryItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCategoryItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD] })
    },
  })
}

function useDeleteCategoryItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCategoryItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD] })
    },
  })
}

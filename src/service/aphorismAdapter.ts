import { getAphorismList } from './api/aphorism'
import { AphorismService } from '@/application/ports'
import { useAphorismAtom } from './store'
import { useUserStore } from './userAdapter'

import { createAphorismItem, deleteAphorismItem, updateAphorismItem } from '@/service/api/aphorism'
import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useAphorismStore(): AphorismService {
  const [aphorism, setAphorism] = useAphorismAtom()
  const { data: aphorismList } = useAphorismList()
  const create = useCreateAphorismItem()
  const update = useUpdateAphorismItem()
  const remove = useDeleteAphorismItem()

  return {
    aphorism,
    aphorismList,
    setAphorism,
    createAphorismItem: create.mutate,
    updateAphorismItem: update.mutate,
    deleteAphorismItem: remove.mutate,
  }
}

// 서버상태
const QUERY_KEY_HEAD = '@aphorismList'
function useAphorismList() {
  const { user } = useUserStore()
  const { userId } = user
  return useQuery({
    queryKey: [QUERY_KEY_HEAD],
    queryFn: () => getAphorismList({ userId }),
    refetchOnMount: false,
    enabled: !!userId,
    refetchOnWindowFocus: false,
  })
}

// 뮤테이션
function useCreateAphorismItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createAphorismItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD] })
    },
  })
}

export function useUpdateAphorismItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAphorismItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD] })
    },
  })
}

function useDeleteAphorismItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAphorismItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_HEAD] })
    },
  })
}
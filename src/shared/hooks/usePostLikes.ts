import { useMemo } from 'react'

import { useGetPostLikesQuery } from '@/src/shared/model/api/postsApi'
import { useAppSelector } from '@/src/shared/model/store/store'

export const usePostLikes = (postId: number) => {
  const {
    data: likesData,
    isFetching,
    isLoading,
  } = useGetPostLikesQuery({ pageSize: 3, postId }, { refetchOnMountOrArgChange: true })

  const currentUserId = useAppSelector(state => state.app.userId)

  const likesCount = likesData?.totalCount

  const isLiked =
    currentUserId != null && likesData?.items?.some(like => like.userId === currentUserId)

  const avatars = useMemo(() => {
    return [...(likesData?.items || [])]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map(user => user.avatars?.[0]?.url)
      .filter(Boolean)
      .slice(0, 3)
  }, [likesData])

  return {
    avatars,
    isLiked,
    likesCount,
  }
}

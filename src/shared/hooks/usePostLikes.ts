import { useMemo, useState } from 'react'

import { PREVIEW_LIKES_LIMIT } from '@/src/shared/lib/constants/post'
import { useGetPostLikesQuery } from '@/src/shared/model/api/postsApi'
import { selectUserId } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'

export const usePostLikes = (postId: number) => {
  const { data: likesData } = useGetPostLikesQuery({ pageSize: PREVIEW_LIKES_LIMIT, postId })
  const currentUserId = useAppSelector(selectUserId)

  const [localLike, setLocalLike] = useState<{
    isLiked?: boolean
    likesCount?: number
  } | null>(null)

  const serverIsLiked =
    currentUserId != null && likesData?.items?.some(like => like.userId === currentUserId)
  const serverLikesCount = likesData?.totalCount || 0

  const avatars = useMemo(() => {
    return [...(likesData?.items || [])]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map(user => user.avatars?.[0]?.url)
  }, [likesData])

  return {
    avatars,
    isLiked: localLike?.isLiked ?? serverIsLiked,
    likesCount: localLike?.likesCount ?? serverLikesCount,
    setLocalLike,
  }
}

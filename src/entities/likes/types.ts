import { Avatar } from '@/src/entities/users/types'

export type LikeStatus = 'DISLIKE' | 'LIKE' | 'NONE'

export type UpdateLikeStatusModel = {
  likeStatus: LikeStatus
}

export type LikeUser = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}
export type PaginatedLikesResponse = {
  items: LikeUser[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type CursorPagination = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
}

export type GetLikesArgs = CursorPagination & {
  postId: number
  search?: string
}

export type GetCommentLikesArgs = CursorPagination & {
  commentId: number
  postId: number
}

export type GetAnswerLikesArgs = CursorPagination & {
  answerId: number
  commentId: number
  postId: number
}

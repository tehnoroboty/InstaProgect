import type { SortDirection } from '@/src/entities/post/types'
import type { Avatar } from '@/src/entities/users/types'

export type Comment = {
  answerCount: number
  content: string
  createdAt: string
  from: {
    avatars: { url: string }[] | Avatar[]
    id: number
    username: string
  }
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export type GetCommentsResponse = {
  items: Comment[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type AnswersComment = {
  commentId: number
  content: string
  createdAt: string
  from: Author
  id: number
  isLiked: boolean
  likeCount: number
}

export type GetAnswersResponse = {
  items: AnswersComment[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type GetAnswersArg = {
  commentId: number
  pageNumber?: number
  pageSize?: number
  postId: number
  sortBy?: string
  sortDirection?: SortDirection
}

export type Author = {
  avatars: Avatar[]
  id: number
  username: string
}

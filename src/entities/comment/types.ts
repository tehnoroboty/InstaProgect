import type { Avatar } from '@/src/entities/user/types'

export type From = {
  avatars: Avatar
  id: number
  username: string
}

export type Comment = {
  answerCount: number
  content: string
  createdAt: string
  from: From
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

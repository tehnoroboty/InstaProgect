import { Avatar } from '@/src/entities/users/types'

export type UserFollowItem = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export type GetFollowersArgs = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
  userName: string
}

export type GetFollowersResponse = {
  items: UserFollowItem[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type GetFollowingArgs = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
  userName: string
}

export type GetFollowingResponse = {
  items: UserFollowItem[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type unfollowingError = {
  data: {
    error: string
    messages: string
    statusCode: number
  }
  status: number
}

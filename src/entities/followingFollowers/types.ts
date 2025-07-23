import { Avatar } from '@/src/entities/users/types'

export type GetFollowersArgs = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
  userName: string
}

export type FollowerItem = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export type GetFollowersResponse = {
  items: FollowerItem[]
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

export type FollowingItem = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export type GetFollowingResponse = {
  items: FollowingItem[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

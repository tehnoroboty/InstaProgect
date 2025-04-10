import type { Post } from '@/src/entities/post/types'

export type PublicPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type UsersCountResponse = { totalCount: number }

import { Avatar } from '@/src/entities/users/types'

export type ItemSearch = {
  avatars: Avatar[]
  createdAt: string
  firstName: string
  id: number
  lastName: string
  userName: string
}

export type GetSearchUserArgs = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
}

export type GetSearchUserResponse = {
  items: ItemSearch[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

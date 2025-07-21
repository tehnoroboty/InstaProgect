import type { SortDirection } from '@/src/entities/post/types'

export type Notifications = {
  createdAt: string
  id: number
  isRead: boolean
  message: string
}
export type GetNotificationsResponse = {
  items: Notifications[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type GetNotificationsArgs = {
  cursor?: number
  isRead?: boolean
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}

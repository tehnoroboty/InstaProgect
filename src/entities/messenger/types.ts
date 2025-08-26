import { Avatar } from '@/src/entities/users/types'

export type GetAllMessagesArgs = {
  cursor?: number
  pageSize?: number
  searchName?: string
}

export type GetAllMessagesResponse = {
  items: LastMessage[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type LastMessage = {
  avatars: Avatar[]
  createdAt: string
  id: number
  messageText: string
  messageType: MessengerMessageType
  ownerId: number
  receiverId: number
  status: StatusType
  updatedAt: string
  userName?: string
}

export type GetMessagesByUserArgs = {
  cursor?: number
  dialoguePartnerId: number
  pageSize?: number
  searchName?: string
}

export type GetMessagesByUserResponse = {
  items: Message[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type Message = {
  createdAt: string
  id: number
  messageText: string
  messageType: MessengerMessageType
  ownerId: number
  receiverId: number
  status: StatusType
  updatedAt: string
}

export type MessengerMessageType = 'IMAGE' | 'TEXT' | 'VOICE'
export type StatusType = 'READ' | 'RECEIVED' | 'SENT'

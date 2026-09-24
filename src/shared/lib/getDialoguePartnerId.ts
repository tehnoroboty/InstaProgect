import { LastMessage } from '@/src/entities/messenger/types'

export const getDialoguePartnerId = (msg: LastMessage, myId: number): number => {
  return msg.ownerId === myId ? msg.receiverId : msg.ownerId
}

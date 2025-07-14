import { Comment } from '@/src/shared/model/api/types'

export const sortComments = (comments: Comment[], currentUserId: number) => {
  return [...comments].sort((a, b) => {
    const aIsMine = a.from.id === currentUserId
    const bIsMine = b.from.id === currentUserId

    if (aIsMine && !bIsMine) return -1
    if (!aIsMine && bIsMine) return 1

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

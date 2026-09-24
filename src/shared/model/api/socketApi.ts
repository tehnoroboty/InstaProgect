import { Notifications } from '@/src/entities/notifications/types'
import { AUTH_KEYS } from '@/src/shared/lib/constants/auth-keys'
import { notificationsApi } from '@/src/shared/model/api/notificationsApi'
import { AppDispatch } from '@/src/shared/model/store/store'
import { Socket, io } from 'socket.io-client'

type NotificationSocket = {
  clientId: string
  eventType: number
  notifyAt: string
} & Notifications

class SocketIoApi {
  static socket: Socket | null = null

  static abortConnection() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  static creatConnection(dispatch: AppDispatch) {
    const token = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN)
    const options = { query: { accessToken: token } }

    const socketUrl = process.env.NEXT_PUBLIC_WS_BASE_URL ?? 'https://inctagram.work'

    this.socket = io(socketUrl, options)

    this.socket.on('connect', () => {})
    this.socket.on('disconnect', () => {})

    this.socket.on('notifications', (data: NotificationSocket) => {
      const newNotification: Notifications = {
        createdAt: data.createdAt,
        id: data.id,
        isRead: false,
        message: `Notifications message: ${data.message}`,
      }

      dispatch(
        notificationsApi.util.updateQueryData('getNotifications', {}, draft => {
          if (!draft.items) {
            draft.items = []
          }

          const existsIndex = draft.items.findIndex(item => item.id === data.id)

          if (existsIndex === -1) {
            draft.items.unshift(newNotification)
            draft.notReadCount += 1
          } else {
            draft.items.splice(existsIndex, 1)
            draft.items.unshift(newNotification)
          }
        })
      )
    })
  }
}

export default SocketIoApi

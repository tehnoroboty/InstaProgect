import { notificationsApi } from '@/src/shared/model/api/notificationsApi'
import { Notifications } from '@/src/shared/model/api/types'
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
    const token = localStorage.getItem('accessToken')
    const options = { query: { accessToken: token } }

    this.socket = io('https://inctagram.work', options)

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

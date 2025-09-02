import { Message } from '@/src/entities/messenger/types'
import { NotificationSocket, Notifications } from '@/src/entities/notifications/types'
import { WS_EVENT_PATH } from '@/src/shared/lib/constants/messenger'
import { notificationsApi } from '@/src/shared/model/api/notificationsApi'
import { AppDispatch } from '@/src/shared/model/store/store'
import { Socket, io } from 'socket.io-client'

const SocketIoApi = {
  abortConnection() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  },

  createConnection() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }

    const token = localStorage.getItem('accessToken')

    this.socket = io('https://inctagram.work', {
      autoConnect: true,
      query: {
        accessToken: token,
      },
      transports: ['websocket'],
    })

    this.socket.on('connect', () => {
      console.log('Socket connected')
    })
    this.socket.on('disconnect', reason => {
      console.log('Socket disconnected', reason)
    })
    this.socket.on('connect_error', error => {
      console.error('Socket connection error:', error.message)
    })
  },

  onMessageReceived(callback: (data: Message | Message[]) => void): () => void {
    if (!this.socket || !this.socket.connected) {
      console.error('Socket not initialized or disconnected')

      return () => {}
    }

    const messageHandler = (data: Message) => {
      console.log(data)

      // debugger
      try {
        const normalizeMessage = (msg: Message): Message =>
          ({
            createdAt: msg.createdAt,
            id: msg.id,
            messageText: String(msg.messageText),
            ownerId: msg.ownerId,
            receiverId: msg.receiverId,
            status: msg.status,
          }) as Message

        const processedData = Array.isArray(data)
          ? data.map(normalizeMessage).reverse()
          : [normalizeMessage(data)]

        callback(processedData)
      } catch (error) {
        console.error('Message processing failed:', error)
      }
    }

    this.socket.on(WS_EVENT_PATH.RECEIVE_MESSAGE, messageHandler)

    return () => {
      this.socket?.off(WS_EVENT_PATH.RECEIVE_MESSAGE, messageHandler)
    }
  },

  // 💬 Messenger

  // 🔔 Notifications
  onNotificationReceived(dispatch: AppDispatch) {
    if (!this.socket) {
      console.error('Socket is not initialized')

      return
    }

    this.socket?.on(WS_EVENT_PATH.NOTIFICATIONS, (data: NotificationSocket) => {
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
  },

  sendMessage(payload: { message: string; receiverId: number }) {
    console.log('📤 sendMessage payload:', payload)
    // debugger // ⬅️ выполнение остановится после лога
    this.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, payload)
  },

  socket: null as Socket | null,
}

export default SocketIoApi

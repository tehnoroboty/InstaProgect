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

  createConnection(dispatch: AppDispatch) {
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

  deleteMessage(messageId: number) {
    this.socket?.emit(WS_EVENT_PATH.MESSAGE_DELETED, messageId)
  },

  // ❌ Error
  onError(callback: (error: { error: string; message: string }) => void) {
    if (!this.socket) {
      return () => {}
    }
    const handler = (err: any) => callback(err)

    this.socket.on(WS_EVENT_PATH.ERROR, handler)

    return () => this.socket?.off(WS_EVENT_PATH.ERROR, handler)
  },

  onMessageDeleted(callback: (messageId: number) => void) {
    if (!this.socket) {
      console.error('Socket is not initialized')

      return () => {}
    }

    const handler = (id: number) => {
      try {
        callback(id)
      } catch (error) {
        console.error('Message delete handling failed:', error)
      }
    }

    this.socket.on(WS_EVENT_PATH.MESSAGE_DELETED, handler)

    return () => {
      this.socket?.off(WS_EVENT_PATH.MESSAGE_DELETED, handler)
    }
  },
  onMessageReceived(callback: (data: Message | Message[]) => void): () => void {
    if (!this.socket || !this.socket.connected) {
      console.error('Socket not initialized or disconnected')

      return () => {}
    }

    const messageHandler = (data: Message) => {
      try {
        const normalizeMessage = (msg: Message): Message =>
          <Message>{
            createdAt: msg.createdAt,
            id: msg.id,
            messageText: String(msg.messageText),
            ownerId: msg.ownerId,
            receiverId: msg.receiverId,
            status: msg.status,
          }

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

  onMessageSent(callback: (data: Message) => void) {
    if (!this.socket) {
      console.error('Socket is not initialized')

      return () => {}
    }

    const handler = (
      data: Message,
      acknowledgeFn?: (ack: { message: Message; receiverId: number }) => void
    ) => {
      callback(data)
      if (acknowledgeFn) {
        acknowledgeFn({
          message: data,
          receiverId: data.receiverId,
        })
      }
    }

    this.socket.on(WS_EVENT_PATH.MESSAGE_SEND, handler)

    return () => {
      this.socket?.off(WS_EVENT_PATH.MESSAGE_SEND, handler)
    }
  },

  onMessageUpdated(callback: (data: Message) => void) {
    if (!this.socket) {
      console.error('Socket is not initialized')

      return () => {}
    }

    const handler = (data: Message) => {
      try {
        callback(data)
      } catch (error) {
        console.error('Message update failed:', error)
      }
    }

    this.socket.on(WS_EVENT_PATH.UPDATE_MESSAGE, handler)

    return () => {
      this.socket?.off(WS_EVENT_PATH.UPDATE_MESSAGE, handler)
    }
  },

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

  // 💬 Messenger
  sendMessage(payload: { message: string; receiverId: number }) {
    this.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, payload)
  },

  socket: null as Socket | null,

  updateMessage(payload: { id: number; message: string }) {
    this.socket?.emit(WS_EVENT_PATH.UPDATE_MESSAGE, payload)
  },
}

export default SocketIoApi

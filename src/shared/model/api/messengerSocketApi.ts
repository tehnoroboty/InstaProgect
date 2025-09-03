import { MessageType } from '@/src/entities/messenger/types'
import { messengerApi } from '@/src/shared/model/api/messengerApi'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { AppDispatch } from '@/src/shared/model/store/store'
import { Socket, io } from 'socket.io-client'

type MessageSendRequest = {
  message: string
  receiverId: number
}

type MessageUpdateRequest = {
  id: number
  message: string
}

type MessageErrorType = {
  error: string
  message: string
}

enum WS_EVENT_PATH {
  ERROR = 'error',
  MESSAGE_DELETED = 'message-deleted',
  MESSAGE_SEND = 'message-send',
  NOTIFICATIONS = 'notifications',
  RECEIVE_MESSAGE = 'receive-message',
  UPDATE_MESSAGE = 'update-message',
}

class MessengerSocketApi {
  static myId: null | number = null

  static socket: Socket | null = null

  static abortConnection() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  static createConnection(dispatch: AppDispatch, myId: number) {
    this.myId = myId
    const token = localStorage.getItem('accessToken')
    const options = { query: { accessToken: token } }

    this.socket = io('https://inctagram.work', options)

    this.socket.onAny((event, ...args) => {
      console.log('📡 socket event:', event, args)
    })

    this.socket.on('connect', () => {})

    this.socket.on('disconnect', () => {})

    // Получение сообщения (отправленного мной или обновлённого после ack)
    this.socket.on(WS_EVENT_PATH.RECEIVE_MESSAGE, (data: MessageType) => {
      console.log('📩 message received:', data)
      dispatch(
        messengerApi.util.updateQueryData(
          'getMessagesByUser',
          { dialoguePartnerId: MessengerSocketApi.getDialoguePartnerId(data) },
          draft => {
            const exists = draft.items.find(m => m.id === data.id)

            if (exists) {
              Object.assign(exists, data) // обновляем статус или текст
            } else {
              draft.items.unshift(data) // добавляем новое сообщение
            }
          }
        )
      )
    })

    // Получение входящего сообщения от собеседника
    this.socket.on(
      WS_EVENT_PATH.MESSAGE_SEND,
      (
        msg: MessageType,
        callback: (data: { message: MessageType; receiverId: number }) => void
      ) => {
        console.log('MESSAGE_SEND', msg)
        // Добавляем в список
        dispatch(
          messengerApi.util.updateQueryData(
            'getMessagesByUser',
            { dialoguePartnerId: MessengerSocketApi.getDialoguePartnerId(msg) },
            draft => {
              const exists = draft.items.find(m => m.id === msg.id)

              if (!exists) {
                draft.items.unshift(msg)
              }
            }
          )
        )
        // Подтверждаем доставку
        callback({ message: msg, receiverId: msg.receiverId })
      }
    )

    this.socket.on(WS_EVENT_PATH.UPDATE_MESSAGE, (data: MessageType) => {
      dispatch(
        messengerApi.util.updateQueryData(
          'getMessagesByUser',
          { dialoguePartnerId: data.receiverId },
          draft => {
            const index = draft.items.findIndex(item => item.id === data.id)

            if (index !== -1) {
              draft.items[index] = data
            }
          }
        )
      )
    })

    // this.socket.on(WS_EVENT_PATH.MESSAGE_DELETED, (data: { id: number }) => {
    //   dispatch(
    //     messengerApi.util.updateQueryData(
    //       'getMessagesByUser',
    //       { dialoguePartnerId: data.id },
    //       draft => {
    //         const index = draft.items.findIndex(item => item.id === data.id)
    //
    //         if (index !== -1) {
    //           draft.items.splice(index, 1)
    //         }
    //       }
    //     )
    //   )
    // })

    this.socket.on(WS_EVENT_PATH.ERROR, (error: { error: string; message: string }) => {
      console.error('WebSocket Error:', error)
      const errorMessage = error.message || error.error || 'Some error occurred'

      dispatch(setAppError({ error: errorMessage }))
    })
  }

  // Вспомогательный метод — чтобы понять кто собеседник
  static getDialoguePartnerId(msg: MessageType): number {
    if (!this.myId) {
      throw new Error('myId is not set')
    }

    return msg.ownerId === this.myId ? msg.receiverId : msg.ownerId
  }

  // static sendImage(receiverId: number, file: File) {
  static sendImage(receiverId: number, imageUrl: string) {
    console.log('📤 sending image name:', imageUrl)

    this.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, {
      // file: file,
      message: imageUrl,
      messageType: 'IMAGE',
      receiverId,
    })
  }

  // Отправка текстового сообщения
  static sendText(receiverId: number, text: string) {
    this.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, { message: text, receiverId })
  }
}

export default MessengerSocketApi

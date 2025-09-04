import { MessageType } from '@/src/entities/messenger/types'
import { WS_EVENT_PATH } from '@/src/shared/lib/constants/messenger'
import { messengerApi } from '@/src/shared/model/api/messengerApi'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { AppDispatch } from '@/src/shared/model/store/store'
import { Socket, io } from 'socket.io-client'

export const MessengerSocketApi = {
  abortConnection() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.myId = null
    }
  },
  createConnection(dispatch: AppDispatch, userId: number) {
    this.myId = userId
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
          { dialoguePartnerId: this.getDialoguePartnerId(data) },
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
        console.log('📥 MESSAGE_SEND:', msg)

        dispatch(
          messengerApi.util.updateQueryData(
            'getMessagesByUser',
            { dialoguePartnerId: this.getDialoguePartnerId(msg) },
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
    // Обновление существующего сообщения
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

    // Ошибка от сервера
    this.socket.on(WS_EVENT_PATH.ERROR, (error: { error: string; message: string }) => {
      console.error('WebSocket Error:', error)
      const errorMessage = error.message || error.error || 'Some error occurred'

      dispatch(setAppError({ error: errorMessage }))
    })
  },

  // Вспомогательный метод — чтобы понять кто собеседник
  getDialoguePartnerId(msg: MessageType): number {
    if (!this.myId) {
      console.log('myId is not set')
    }

    return msg.ownerId === this.myId ? msg.receiverId : msg.ownerId
  },

  myId: null as null | number,

  // Отправка текста
  sendText(receiverId: number, text: string) {
    console.log('📤 sending text:', text)
    this.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, { message: text, receiverId })
  },

  socket: null as Socket | null,
}

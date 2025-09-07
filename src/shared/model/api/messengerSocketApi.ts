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

    this.socket.on('connect', () => {})

    this.socket.on('disconnect', () => {})

    this.socket.on(WS_EVENT_PATH.RECEIVE_MESSAGE, (data: MessageType) => {
      console.log('Пришло сообщение из сокета:', data)
      dispatch(
        messengerApi.util.updateQueryData(
          'getMessagesByUser',
          { dialoguePartnerId: this.getDialoguePartnerId(data) },
          draft => {
            const exists = draft.items.find(m => m.id === data.id)

            if (exists) {
              Object.assign(exists, data)
            } else {
              draft.items.unshift(data)
            }
          }
        )
      )
      dispatch(messengerApi.util.invalidateTags(['MESSAGES']))
    })

    this.socket.on(
      WS_EVENT_PATH.MESSAGE_SEND,
      (
        msg: MessageType,
        callback: (data: { message: MessageType; receiverId: number }) => void
      ) => {
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
        dispatch(messengerApi.util.invalidateTags(['MESSAGES']))
        callback({ message: msg, receiverId: msg.receiverId })
      }
    )
    this.socket.on(WS_EVENT_PATH.UPDATE_MESSAGE, (data: MessageType) => {
      dispatch(
        messengerApi.util.updateQueryData(
          'getMessagesByUser',
          { dialoguePartnerId: this.getDialoguePartnerId(data) },
          draft => {
            const index = draft.items.findIndex(item => item.id === data.id)

            if (index !== -1) {
              draft.items[index] = data
            }
          }
        )
      )
      dispatch(messengerApi.util.invalidateTags(['MESSAGES']))
    })

    this.socket.on(WS_EVENT_PATH.ERROR, (error: { error: string; message: string }) => {
      console.error('WebSocket Error:', error)
      const errorMessage = error.message || error.error || 'Some error occurred'

      dispatch(setAppError({ error: errorMessage }))
    })
  },

  getDialoguePartnerId(msg: MessageType): number {
    if (!this.myId) {
      throw new Error('myId is not set')
    }

    return msg.ownerId === this.myId ? msg.receiverId : msg.ownerId
  },

  myId: null as null | number,

  sendImage(receiverId: number, message: string) {
    this.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, {
      message,
      receiverId,
    })
  },

  sendText(receiverId: number, text: string) {
    this.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, { message: text, receiverId })
  },

  socket: null as Socket | null,
}

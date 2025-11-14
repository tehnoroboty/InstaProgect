import { MessageType } from '@/src/entities/messenger/types'
import { AUTH_KEYS } from '@/src/shared/lib/constants/auth-keys'
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
    const token = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN)
    const options = { query: { accessToken: token } }

    const socketUrl = process.env.NEXT_PUBLIC_WS_BASE_URL ?? 'https://inctagram.work'

    this.socket = io(socketUrl, options)

    this.socket.on('connect', () => {})

    this.socket.on('disconnect', () => {})

    this.socket.on(WS_EVENT_PATH.RECEIVE_MESSAGE, (data: MessageType) => {
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

    this.socket.on(WS_EVENT_PATH.ERROR, (error: { error: string; message: string }) => {
      const errorMessage = error.message || error.error || 'Some error occurred'

      dispatch(setAppError({ error: errorMessage }))
    })

    this.socket.on(WS_EVENT_PATH.MESSAGE_DELETED, (messageId: number) => {
      const partnerId = this.getDialogIdFromURL()

      if (!partnerId) {
        return null
      }

      dispatch(
        messengerApi.util.updateQueryData(
          'getMessagesByUser',
          { dialoguePartnerId: partnerId },
          draft => {
            const filteredMsg = draft.items.filter(msg => msg.id !== messageId)

            draft.items = [...filteredMsg]
          }
        )
      )

      dispatch(messengerApi.util.invalidateTags(['MESSAGES']))
    })
  },

  getDialogIdFromURL(): null | number {
    const urlParams = new URLSearchParams(window.location.search)
    const dialogId = urlParams.get('dialogId')

    return dialogId ? parseInt(dialogId, 10) : null
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

  updateText(messageId: number, text: string) {
    this.socket?.emit(WS_EVENT_PATH.UPDATE_MESSAGE, { id: messageId, message: text })
  },
}

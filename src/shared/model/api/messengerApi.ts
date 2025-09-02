import {
  GetAllMessagesArgs,
  GetAllMessagesResponse,
  GetMessagesByUserArgs,
  GetMessagesByUserResponse,
  SendMessageArgs,
} from '@/src/entities/messenger/types'
import { baseApi } from '@/src/shared/model/api/baseApi'
import SocketIoApi from '@/src/shared/model/api/socketApi'

export const messengerApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllMessages: builder.query<GetAllMessagesResponse, GetAllMessagesArgs>({
      async onCacheEntryAdded(_arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded

          // Подписка на новые сообщения
          const unsubscribeReceive = SocketIoApi.onMessageReceived(messages => {
            updateCachedData(draft => {
              const newMessages = Array.isArray(messages) ? messages : [messages]

              for (const message of newMessages) {
                // Найдём, есть ли уже такой диалог (по id собеседника)
                const existingDialog = draft.items.find(
                  m =>
                    (m.ownerId === message.ownerId && m.receiverId === message.receiverId) ||
                    (m.ownerId === message.receiverId && m.receiverId === message.ownerId)
                )

                if (existingDialog) {
                  // 🔹 Обновляем существующий диалог (последнее сообщение)
                  existingDialog.messageText = message.messageText
                  existingDialog.updatedAt = message.updatedAt
                  existingDialog.createdAt = message.createdAt
                  existingDialog.status = message.status
                  existingDialog.ownerId = message.ownerId
                  existingDialog.receiverId = message.receiverId

                  // перемещаем наверх (так как последнее сообщение стало новым)
                  draft.items = [
                    existingDialog,
                    ...draft.items.filter(m => m.id !== existingDialog.id),
                  ]
                } else {
                  // 🔹 Если диалога ещё нет — добавляем новый
                  draft.items.unshift({
                    avatars: [], // можно дополнить если придёт из бэка
                    createdAt: message.createdAt,
                    id: message.id,
                    messageText: message.messageText,
                    messageType: message.messageType,
                    ownerId: message.ownerId,
                    receiverId: message.receiverId,
                    status: message.status,
                    updatedAt: message.updatedAt,
                  })

                  draft.totalCount += 1
                }
              }
            })
          })

          await cacheEntryRemoved
          unsubscribeReceive()
        } catch (e) {
          console.error('Error in getAllMessages subscription:', e)
        }
      },
      providesTags: ['MESSAGES'],
      query: ({ cursor, pageSize = 10, searchName }) => ({
        method: 'GET',
        params: {
          cursor,
          pageSize,
          searchName,
        },
        url: `messenger`,
      }),
    }),
    getMessagesByUser: builder.query<GetMessagesByUserResponse, GetMessagesByUserArgs>({
      // 🔹 Сортируем сообщения по времени (старые → новые)
      async onCacheEntryAdded(
        { dialoguePartnerId }, // 👉 например { dialoguePartnerId: 42 }
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded // ждём пока загрузятся сообщения с бэка

          // 🔗 подписка на получение новых сообщений
          const unsubscribeReceive = SocketIoApi.onMessageReceived(messages => {
            updateCachedData(draft => {
              const newMessages = Array.isArray(messages) ? messages : [messages]

              for (const message of newMessages) {
                const exists = draft.items.some(m => m.id === message.id)

                if (!exists) {
                  if (
                    message.ownerId === dialoguePartnerId ||
                    message.receiverId === dialoguePartnerId
                  ) {
                    draft.items.unshift(message)
                    draft.totalCount += 1
                  }
                }
              }
            })
          })

          await cacheEntryRemoved
          unsubscribeReceive()
        } catch (error) {
          console.error('Error in message subscription:', error)
        }
      },
      providesTags: (_result, _error, arg) => [{ id: arg.dialoguePartnerId, type: 'MESSAGES' }],
      query: ({ cursor, dialoguePartnerId, pageSize = 12, searchName }) => ({
        method: 'GET',
        params: {
          cursor,
          pageSize,
          searchName,
        },
        url: `messenger/${dialoguePartnerId}`,
      }),
    }),
    sendMessage: builder.mutation<void, SendMessageArgs>({
      queryFn: ({ message, receiverId }) => {
        try {
          SocketIoApi.sendMessage({ message, receiverId })

          return { data: undefined }
        } catch (error) {
          return {
            error: {
              error: `Failed to send message: ${error}`,
              status: 'CUSTOM_ERROR',
            },
          }
        }
      },
    }),
  }),

  overrideExisting: false,
})

export const { useGetAllMessagesQuery, useGetMessagesByUserQuery, useSendMessageMutation } =
  messengerApi

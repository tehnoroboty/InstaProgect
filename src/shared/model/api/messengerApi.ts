import {
  DeleteMessageArgs,
  GetAllMessagesArgs,
  GetAllMessagesResponse,
  GetMessagesByUserArgs,
  GetMessagesByUserResponse,
  SendMessageArgs,
  UpdateMessageStatus,
} from '@/src/entities/messenger/types'
import { MessageStatus } from '@/src/shared/lib/constants/messenger'
import { baseApi } from '@/src/shared/model/api/baseApi'
import SocketIoApi from '@/src/shared/model/api/socketApi'

export const messengerApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteMessage: builder.mutation<void, DeleteMessageArgs>({
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            messengerApi.util.updateQueryData('getAllMessages', {}, draft => {
              draft.items = draft.items.filter(msg => msg.id !== arg.id)
              draft.totalCount = Math.max(0, draft.totalCount - 1)
            })
          )

          dispatch(
            messengerApi.util.updateQueryData(
              'getMessagesByUser',
              { dialoguePartnerId: arg.dialoguePartnerId },
              draft => {
                draft.items = draft.items.filter(msg => msg.id !== arg.id)
                draft.totalCount = Math.max(0, draft.totalCount - 1)
              }
            )
          )
        } catch (error) {
          console.error('Failed to delete message', error)
        }
      },
      query: ({ id }) => ({
        method: 'DELETE',
        url: `/messenger/${id}`,
      }),
    }),
    getAllMessages: builder.query<GetAllMessagesResponse, GetAllMessagesArgs>({
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
      /*
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(setAppError({ error: null }))
        } catch (err) {
          const error = err as CustomerError
          const errorMessage =
            error.data?.messages?.[0]?.message ?? error.data?.error ?? 'Unknown error'

          dispatch(setAppError({ error: errorMessage }))
        }
      },
*/
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
                    draft.items.push(message)
                    draft.totalCount += 1
                  }
                }
              }
            })
          })

          // 🔗 подписка на удаление сообщений
          const unsubscribeDelete = SocketIoApi.onMessageDeleted(deletedId => {
            updateCachedData(draft => {
              draft.items = draft.items.filter(m => m.id !== deletedId)
              draft.totalCount = Math.max(0, draft.totalCount - 1)
            })
          })

          await cacheEntryRemoved
          unsubscribeReceive()
          unsubscribeDelete()
        } catch (error) {
          console.error('Error in message subscription:', error)
        }
      },
      /*
      transformResponse: (response: GetMessagesByUserResponse) => ({
        ...response,
        items: response.items.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ),
      }),
*/
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
      queryFn: async ({ message, receiverId }) => {
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
    updateMessageStatus: builder.mutation<void, UpdateMessageStatus>({
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(
            messengerApi.util.updateQueryData('getAllMessages', {}, draft => {
              arg.ids.forEach(id => {
                const msg = draft.items.find(dialog => dialog.id === id)

                if (msg) {
                  msg.status = MessageStatus.READ
                }
              })
            })
          )

          dispatch(
            messengerApi.util.updateQueryData(
              'getMessagesByUser',
              { dialoguePartnerId: arg.dialoguePartnerId },
              draft => {
                arg.ids.forEach(id => {
                  const msg = draft.items.find(m => m.id === id)

                  if (msg) {
                    msg.status = MessageStatus.READ
                  }
                })
              }
            )
          )
        } catch (error) {
          console.error('Failed to update message status', error)
        }
      },
      query: ({ ids }) => ({
        body: { ids },
        method: 'PUT',
        url: `/messenger`,
      }),
    }),
  }),

  overrideExisting: false,
})

export const {
  useDeleteMessageMutation,
  useGetAllMessagesQuery,
  useGetMessagesByUserQuery,
  useSendMessageMutation,
  useUpdateMessageStatusMutation,
} = messengerApi

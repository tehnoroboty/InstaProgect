import { CustomerError } from '@/src/entities/errors/types'
import {
  GetAllMessagesArgs,
  GetAllMessagesResponse,
  GetMessagesByUserArgs,
  GetMessagesByUserResponse,
} from '@/src/entities/messenger/types'
import { getDialoguePartnerId } from '@/src/shared/lib/getDialoguePartnerId'
import { baseApi } from '@/src/shared/model/api/baseApi'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { store } from '@/src/shared/model/store/store'

export const messengerApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllMessages: builder.query<
      GetAllMessagesResponse,
      GetAllMessagesArgs & { myId: null | number }
    >({
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.cursor !== previousArg?.cursor ||
          currentArg?.searchName !== previousArg?.searchName
        )
      },
      merge: (currentCache, newResponse, { arg }) => {
        const { myId } = arg
        const combined = [...currentCache.items, ...newResponse.items]

        const dialogueMap = new Map<number, (typeof combined)[0]>()

        combined.forEach(msg => {
          const dialogueId = getDialoguePartnerId(msg, myId!)

          if (
            !dialogueMap.has(dialogueId) ||
            new Date(msg.createdAt) > new Date(dialogueMap.get(dialogueId)!.createdAt)
          ) {
            dialogueMap.set(dialogueId, msg)
          }
        })

        currentCache.items = Array.from(dialogueMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        currentCache.totalCount = newResponse.totalCount
        currentCache.notReadCount = newResponse.notReadCount
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
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
    }),
    getMessagesByUser: builder.query<GetMessagesByUserResponse, GetMessagesByUserArgs>({
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
  }),
  overrideExisting: false,
})

export const { useGetAllMessagesQuery, useGetMessagesByUserQuery } = messengerApi

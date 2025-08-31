import { CustomerError } from '@/src/entities/errors/types'
import {
  GetAllMessagesArgs,
  GetAllMessagesResponse,
  GetMessagesByUserArgs,
  GetMessagesByUserResponse,
} from '@/src/entities/messenger/types'
import { baseApi } from '@/src/shared/model/api/baseApi'
import { setAppError } from '@/src/shared/model/slices/appSlice'

export const messengerApi = baseApi.injectEndpoints({
  endpoints: builder => ({
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

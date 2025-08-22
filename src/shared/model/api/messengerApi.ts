import {
  GetAllMessagesArgs,
  GetAllMessagesResponse,
  GetMessagesByUserArgs,
  GetMessagesByUserResponse,
} from '@/src/entities/messenger/types'
import { baseApi } from '@/src/shared/model/api/baseApi'

export const messengerApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllMessages: builder.query<GetAllMessagesResponse, GetAllMessagesArgs>({
      providesTags: ['MESSAGES'],
      query: ({ cursor, pageSize, searchName }) => ({
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

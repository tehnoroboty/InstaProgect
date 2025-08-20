import { GetMessagesByUserArgs, GetMessagesByUserResponse } from '@/src/entities/messenger/types'
import { baseApi } from '@/src/shared/model/api/baseApi'

export const messengerApi = baseApi.injectEndpoints({
  endpoints: builder => ({
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
})

export const { useGetMessagesByUserQuery } = messengerApi

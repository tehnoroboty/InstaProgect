import { GetAllMessagesArgs, GetAllMessagesResponse } from '@/src/entities/messenger/types'
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
  }),
  overrideExisting: false,
})

export const { useGetAllMessagesQuery } = messengerApi

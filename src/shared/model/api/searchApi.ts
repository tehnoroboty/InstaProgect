import { baseApi } from '@/src/shared/model/api/baseApi'
import { GetSearchUserArgs, GetSearchUserResponse } from '@/src/shared/model/api/types'

export const searchApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSearchUser: builder.query<GetSearchUserResponse, GetSearchUserArgs>({
      query: ({ cursor, pageNumber, pageSize, search }) => ({
        method: 'GET',
        params: {
          cursor,
          pageNumber,
          pageSize,
          search,
        },
        url: `users`,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetSearchUserQuery } = searchApi

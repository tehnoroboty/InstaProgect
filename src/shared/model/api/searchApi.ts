import { GetSearchUserArgs, GetSearchUserResponse } from '@/src/entities/search/types'
import { baseApi } from '@/src/shared/model/api/base/baseApi'

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

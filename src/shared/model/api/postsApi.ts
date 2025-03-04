import { baseApi } from '@/src/shared/model/api/baseApi'
import { GetMyPostsArgs, GetMyPostsResponse } from '@/src/shared/model/api/types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyPosts: builder.query<GetMyPostsResponse, GetMyPostsArgs>({
      query: ({ pageNumber, pageSize, sortBy, sortDirection, userName }) => ({
        method: 'GET',
        params: {
          pageNumber,
          pageSize,
          sortBy,
          sortDirection,
        },
        url: `/posts/${userName}`,
      }),
    }),
  }),
})

export const { useGetMyPostsQuery } = postsApi

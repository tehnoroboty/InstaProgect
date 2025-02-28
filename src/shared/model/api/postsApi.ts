import { baseApi } from '@/src/shared/model/api/baseApi'
import { GetMyPostsResponse } from '@/src/shared/model/api/types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyPosts: builder.query<GetMyPostsResponse, string>({
      query: data => ({
        method: 'GET',
        url: `/posts/${data}`,
      }),
    }),
  }),
})

export const { useGetMyPostsQuery } = postsApi

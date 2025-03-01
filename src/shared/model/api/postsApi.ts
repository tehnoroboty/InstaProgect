import { baseApi } from '@/src/shared/model/api/baseApi'
import { GetMyPostsArgs, GetMyPostsResponse } from '@/src/shared/model/api/types'

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyPosts: builder.query<GetMyPostsResponse, GetMyPostsArgs>({
      query: data => ({
        method: 'GET',
        url: `/posts/${data.userName}`,
      }),
    }),
  }),
})

export const { useGetMyPostsQuery } = postsApi

import type { PublicPostsResponse, UsersCountResponse } from '@/src/shared/model/api/posts/types'

import { baseApi } from '@/src/shared/model/api/baseApi'

export const publicPostsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllPublicPosts: builder.query<
      PublicPostsResponse,
      { endCursorPostId: number; pageSize: number; sortBy?: string; sortDirection?: string }
    >({
      query: ({ endCursorPostId, pageSize, sortBy, sortDirection }) =>
        `public-posts/all/${endCursorPostId}?pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
    }),
    getUsersCount: builder.query<UsersCountResponse, void>({
      query: () => 'public-user',
    }),
  }),
})

export const { useGetAllPublicPostsQuery, useGetUsersCountQuery } = publicPostsApi

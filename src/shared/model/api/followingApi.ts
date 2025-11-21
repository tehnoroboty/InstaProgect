import {
  GetFollowersArgs,
  GetFollowersResponse,
  GetFollowingArgs,
  GetFollowingResponse,
} from '@/src/entities/followingFollowers/types'
import { baseApi } from '@/src/shared/model/api/base/baseApi'

export const followingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    follow: builder.mutation<void, number>({
      invalidatesTags: ['FOLLOWING'],
      query: userId => {
        return {
          body: { selectedUserId: userId },
          method: 'POST',
          url: 'users/following',
        }
      },
    }),
    getFollowers: builder.query<GetFollowersResponse, GetFollowersArgs>({
      providesTags: ['FOLLOWING'],
      query: ({ userName, ...params }) => ({
        method: 'GET',
        params,
        url: `users/${userName}/followers`,
      }),
    }),
    getFollowing: builder.query<GetFollowingResponse, GetFollowingArgs>({
      providesTags: ['FOLLOWING'],
      query: ({ userName, ...params }) => ({
        method: 'GET',
        params,
        url: `users/${userName}/following`,
      }),
    }),
    unFollow: builder.mutation<void, number>({
      invalidatesTags: ['FOLLOWING'],
      query: userId => {
        return {
          body: { userId: userId },
          method: 'DELETE',
          url: `users/follower/${userId}`,
        }
      },
    }),
  }),
})

export const {
  useFollowMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useUnFollowMutation,
} = followingApi

import { baseApi } from '@/src/shared/model/api/baseApi'
import { GetSearchUserArgs, GetSearchUserResponse } from '@/src/shared/model/api/types'

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
    getSearchUser: builder.query<GetSearchUserResponse, GetSearchUserArgs>({
      // invalidatesTags: ['FOLLOWING'],
      query: ({ cursor, pageNumber, pageSize, search }) => {
        return {
          method: 'GET',
          params: {
            cursor,
            pageNumber,
            pageSize,
            search,
          },
          url: `users`,
        }
      },
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

export const { useFollowMutation, useGetSearchUserQuery, useUnFollowMutation } = followingApi

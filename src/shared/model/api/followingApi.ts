import { baseApi } from '@/src/shared/model/api/baseApi'

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

export const { useFollowMutation, useUnFollowMutation } = followingApi

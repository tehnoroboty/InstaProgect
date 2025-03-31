import { Profile } from '@/src/entities/user/types'
import { baseApi } from '@/src/shared/model/api/baseApi'

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteProfileAvatar: builder.mutation<void, void>({
      query: () => {
        return {
          method: 'DELETE',
          url: 'users/profile/avatar',
        }
      },
    }),
    getMyProfile: builder.query<Profile, void>({
      query: () => '/users/profile',
    }),
    getUserProfile: builder.query<any, string>({
      providesTags: ['FOLLOWING'],
      query: userName => `/users/${userName}`,
    }),
  }),
})

export const { useDeleteProfileAvatarMutation, useGetMyProfileQuery, useGetUserProfileQuery } =
  usersApi

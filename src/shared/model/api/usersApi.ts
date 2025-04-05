import { Profile } from '@/src/entities/user/types'
import { baseApi } from '@/src/shared/model/api/baseApi'

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyProfile: builder.query<Profile, void>({
      query: () => '/users/profile',
    }),
    // TODO: types for getUserProfile
    getUserProfile: builder.query<any, number>({
      providesTags: ['USER_PROFILE'],
      query: profileId => `/public-user/profile/${profileId}`,
    }),
  }),
})

export const { useGetMyProfileQuery, useGetUserProfileQuery } = usersApi

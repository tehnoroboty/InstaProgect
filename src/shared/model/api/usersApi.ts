import { Profile } from '@/src/entities/user/types'
import { baseApi } from '@/src/shared/model/api/baseApi'

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyProfile: builder.query<Profile, void>({
      query: () => '/users/profile',
    }),
    getUserProfile: builder.query<any, string>({
      providesTags: ['FOLLOWING'],
      query: userName => `/users/${userName}`,
    }),
  }),
})

export const { useGetMyProfileQuery, useGetUserProfileQuery } = usersApi

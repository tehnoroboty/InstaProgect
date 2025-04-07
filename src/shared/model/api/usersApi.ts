import { Profile, ProfileByUserName, PublicProfileTypes } from '@/src/entities/user/types'
import { baseApi } from '@/src/shared/model/api/baseApi'

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyProfile: builder.query<Profile, void>({
      query: () => '/users/profile',
    }),
    getUserProfile: builder.query<ProfileByUserName, string>({
      providesTags: ['FOLLOWING'],
      query: userName => `/users/${userName}`,
    }),
    getUserProfileById: builder.query<PublicProfileTypes, number>({
      providesTags: ['USER_PROFILE'],
      query: profileId => `/public-user/profile/${profileId}`,
    }),
  }),
})

export const { useGetMyProfileQuery, useGetUserProfileQuery, useGetUserProfileByIdQuery } = usersApi

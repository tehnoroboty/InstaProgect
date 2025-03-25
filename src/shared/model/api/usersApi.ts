import { Profile } from '@/src/entities/user/types'
import { baseApi } from '@/src/shared/model/api/baseApi'
import {
  GetPublicUserProfileArgs,
  GetPublicUserProfileResponse,
} from '@/src/shared/model/api/types'

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicUserProfile: builder.query<GetPublicUserProfileResponse, GetPublicUserProfileArgs>({
      query: ({ profileId }) => ({
        method: 'GET',
        url: `/public-user/profile/${profileId}`,
      }),
    }),
    getUserProfile: builder.query<Profile, void>({
      query: () => '/users/profile',
    }),
  }),
})

export const { useGetPublicUserProfileQuery, useGetUserProfileQuery } = usersApi

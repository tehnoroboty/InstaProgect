import { Profile } from '@/src/entities/user/types'
import { baseApi } from '@/src/shared/model/api/baseApi'
import {
  GetPublicUserProfileArgs,
  GetPublicUserProfileResponse,
} from '@/src/shared/model/api/types'

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyProfile: builder.query<Profile, void>({
      query: () => '/users/profile',
    }),
  }),
})

export const { useGetMyProfileQuery } = usersApi

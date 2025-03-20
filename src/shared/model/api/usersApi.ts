import { Profile } from '@/src/entities/user/types'
import { baseApi } from '@/src/shared/model/api/baseApi'

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserProfile: builder.query<Profile, void>({
      query: () => 'users/profile',
    }),
  }),
})

export const { useGetUserProfileQuery } = usersApi

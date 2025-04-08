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
      providesTags: ['PROFILE'],
      query: () => '/users/profile',
    }),
    getUserProfile: builder.query<any, string>({
      providesTags: ['FOLLOWING'],
      query: userName => `/users/${userName}`,
    }),
    putUserProfile: builder.mutation<any, any>({
      invalidatesTags: ['PROFILE'],
      query: ({ aboutMe, city, country, dateOfBirth, firstName, lastName, region, userName }) => {
        return {
          body: {
            aboutMe,
            city,
            country,
            dateOfBirth,
            firstName,
            lastName,
            region,
            userName,
          },
          method: 'PUT',
          url: 'users/profile',
        }
      },
    }),
  }),
})

export const {
  useDeleteProfileAvatarMutation,
  useGetMyProfileQuery,
  useGetUserProfileQuery,
  usePutUserProfileMutation,
} = usersApi

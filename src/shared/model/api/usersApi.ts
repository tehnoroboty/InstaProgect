import { Profile, ProfileByUserName, PublicProfileTypes } from '@/src/entities/user/types'
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
    getUserProfile: builder.query<ProfileByUserName, string>({
      providesTags: ['FOLLOWING'],
      query: userName => `/users/${userName}`,
    }),
    getUserProfileById: builder.query<PublicProfileTypes, number>({
      providesTags: ['USER_PROFILE'],
      query: profileId => `/public-user/profile/${profileId}`,
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
    updateUserAvatar: builder.mutation<string, { file: File }>({
      invalidatesTags: ['PROFILE'],
      query: ({ file }) => {
        const formData = new FormData()

        formData.append('file', file)

        return {
          body: formData,
          method: 'POST',
          url: 'users/profile/avatar',
        }
      },
    }),
  }),
})

export const { useGetMyProfileQuery,
    useGetUserProfileQuery,
    useGetUserProfileByIdQuery ,
    useDeleteProfileAvatarMutation,
    usePutUserProfileMutation,
    useUpdateUserAvatarMutation,} = usersApi


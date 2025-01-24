import { CreateNewPasswordRecoveryType, PasswordRecoveryType } from '@/src/store/services/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: builder => ({
    createNewPassword: builder.mutation<void, CreateNewPasswordRecoveryType>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/new-password',
      }),
    }),
    passwordRecovery: builder.mutation<void, PasswordRecoveryType>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/password-recovery',
      }),
    }),
  }),
  reducerPath: 'authApi',
})

export const { useCreateNewPasswordMutation, usePasswordRecoveryMutation } = authApi

import {
  CreateNewPasswordRecoveryType,
  PasswordRecoveryType,
  RecoveryCodeResponse,
  RecoveryCodeType, RegistrationType 
} from '@/src/store/services/types'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type ExchangeGoogleCodeForTokenResponse = {
  accessToken: string
  email: string
}

type ArgsPostGoogleOAuth = {
  code: string
  redirectUrl: string
}

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
    registration: builder.mutation<void, RegistrationType>({
        query: body => ({
          body,
          method: 'POST',
          url: 'auth/registration',
        }),
      }),
    registrationConfirmation: builder.mutation<void, { confirmationCode: string }>({
        query: body => ({
          body,
          method: 'POST',
          url: 'auth/registration-confirmation',
        }),
      }),
    recoveryCode: builder.mutation<RecoveryCodeResponse, RecoveryCodeType>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/check-recovery-code',
      }),
    }),
     exchangeGoogleCodeForToken: builder.mutation<
        ExchangeGoogleCodeForTokenResponse,
        ArgsPostGoogleOAuth
      >({
        query: body => {
          return {
            body,
            method: 'POST',
            url: 'auth/google/login',
          }
        },
      }),
      
    }),
  reducerPath: 'authApi',
})

export const {
  useCreateNewPasswordMutation,
  usePasswordRecoveryMutation,
  useRecoveryCodeMutation,useExchangeGoogleCodeForTokenMutation,useExchangeGoogleCodeForTokenMutation,
  useRegistrationConfirmationMutation,
  useRegistrationMutation,
} = authApi


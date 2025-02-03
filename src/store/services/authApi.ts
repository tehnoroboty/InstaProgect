import { FormType } from '@/src/app/auth/login/page'
import { baseApi } from '@/src/store/services/baseApi'

import {
  ArgsPostGoogleOAuth,
  CreateNewPasswordRecoveryType,
  ExchangeGoogleCodeForTokenResponse,
  PasswordRecoveryType,
  RecoveryCodeResponse,
  RecoveryCodeType,
  RegistrationType,
} from './types'

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
    login: builder.mutation<{ accessToken: string }, FormType>({
      query: body => ({
        body,
        method: 'POST',
        url: 'auth/login',
      }),
    }),
    passwordRecovery: builder.mutation<void, PasswordRecoveryType>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/password-recovery',
      }),
    }),
    recoveryCode: builder.mutation<RecoveryCodeResponse, RecoveryCodeType>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/check-recovery-code',
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
  }),
})

export const {
  useCreateNewPasswordMutation,
  useExchangeGoogleCodeForTokenMutation,
  useLoginMutation,
  usePasswordRecoveryMutation,
  useRecoveryCodeMutation,
  useRegistrationConfirmationMutation,
  useRegistrationMutation,
} = authApi

import { FormType } from '@/src/app/auth/login/page'

import { baseApi } from './baseApi'
import {
  ArgsPostGoogleOAuth,
  CreateNewPasswordRecoveryType,
  OAuthTokenResponse,
  PasswordRecoveryType,
  RecoveryCodeResponse,
  RecoveryCodeType,
  RegistrationType,
} from './types'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createNewPassword: builder.mutation<void, CreateNewPasswordRecoveryType>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/new-password',
      }),
    }),
    exchangeGoogleCodeForToken: builder.mutation<OAuthTokenResponse, ArgsPostGoogleOAuth>({
      query: body => {
        return {
          body,
          method: 'POST',
          url: 'auth/google/login',
        }
      },
    }),
    gettingAccessThroughGithub: builder.query<OAuthTokenResponse, { redirect_url: string }>({
      query: params => {
        // const queryString = new URLSearchParams(params)

        return {
          params,
          url: 'auth/github/login',
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
  useLazyGettingAccessThroughGithubQuery,
  useLoginMutation,
  usePasswordRecoveryMutation,
  useRecoveryCodeMutation,
  useRegistrationConfirmationMutation,
  useRegistrationMutation,
} = authApi

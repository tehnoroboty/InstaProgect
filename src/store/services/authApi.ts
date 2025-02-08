import { FormType } from '@/src/features/login/validators'
import { baseApi } from '@/src/store/services/baseApi'

import {
  ArgsPostGoogleOAuth,
  CreateNewPasswordRecoveryType,
  OAuthTokenResponse,
  PasswordRecoveryType,
  RecoveryCodeResponse,
  RecoveryCodeType,
  RegistrationEmailResending,
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
    login: builder.mutation<{ accessToken: string }, FormType>({
      query: body => ({
        body,
        method: 'POST',
        url: 'auth/login',
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
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
    registrationEmailResending: builder.mutation<void, RegistrationEmailResending>({
      query: body => ({
        body,
        method: 'POST',
        url: 'auth/registration-email-resending',
      }),
    }),
  }),
})

export const {
  useCreateNewPasswordMutation,
  useExchangeGoogleCodeForTokenMutation,
  useLoginMutation,
  useLogoutMutation,
  usePasswordRecoveryMutation,
  useRecoveryCodeMutation,
  useRegistrationConfirmationMutation,
  useRegistrationEmailResendingMutation,
  useRegistrationMutation,
} = authApi

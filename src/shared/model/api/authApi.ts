import { setAppError, setUserId } from '../slices/appSlice'
import {
  ArgsPostGoogleOAuth,
  CreateNewPasswordRecoveryType,
  MeResponse,
  OAuthTokenResponse,
  PasswordRecoveryType,
  RecoveryCodeResponse,
  RecoveryCodeType,
  RegistrationEmailResending,
  RegistrationType,
} from './types'
import { FormType } from '@/src/features/login/validators'
import { baseApi } from '@/src/shared/model/api/baseApi'

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
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled

          localStorage.setItem('accessToken', res.data.accessToken)
        } catch (error) {
          const errorResponse = error as { error: { data: { messages: [{ message: string }] } } }

          dispatch(setAppError({ error: errorResponse.error.data.messages[0].message }))
        }
      },
      query: body => {
        return {
          body,
          method: 'POST',
          url: 'auth/google/login',
        }
      },
    }),
    login: builder.mutation<{ accessToken: string }, FormType>({
      async onQueryStarted(_args, { queryFulfilled }) {
        const response = await queryFulfilled

        localStorage.setItem('accessToken', response.data.accessToken)
      },
      query: body => ({
        body,
        method: 'POST',
        url: 'auth/login',
      }),
    }),
    logout: builder.mutation<void, void>({
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(baseApi.util.resetApiState())
          localStorage.removeItem('accessToken')
        } catch (error) {
          console.error('Ошибка при разлогине:', error)
        }
      },
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
    }),
    me: builder.query<MeResponse, void>({
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled

          dispatch(setUserId({ userId: res.data.userId }))
        } catch (error) {
          console.error('Ошибка ME запроса:', error)
        }
      },
      query: () => 'auth/me',
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
  useMeQuery,
  usePasswordRecoveryMutation,
  useRecoveryCodeMutation,
  useRegistrationConfirmationMutation,
  useRegistrationEmailResendingMutation,
  useRegistrationMutation,
} = authApi

import { FormType } from '@/src/features/login/validators'
import { baseApi } from '@/src/store/services/baseApi'

import { setAppError, setIsLoggedIn } from '../Slices/appSlice'
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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
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
      invalidatesTags: ['ME'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem('accessToken')
          dispatch(authApi.util.resetApiState())
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
      providesTags: ['ME'],
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
  useLazyMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  usePasswordRecoveryMutation,
  useRecoveryCodeMutation,
  useRegistrationConfirmationMutation,
  useRegistrationEmailResendingMutation,
  useRegistrationMutation,
} = authApi

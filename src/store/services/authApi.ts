import { RegistrationType } from '@/src/store/services/types'
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
  endpoints: builder => {
    return {
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
    }
  },
  reducerPath: 'authApi',
})

export const {
  useExchangeGoogleCodeForTokenMutation,
  useRegistrationConfirmationMutation,
  useRegistrationMutation,
} = authApi

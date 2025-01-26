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
    }
  },
  reducerPath: 'authApi',
})

export const { useExchangeGoogleCodeForTokenMutation } = authApi

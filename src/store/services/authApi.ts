import { baseApi } from '@/src/store/services/baseApi'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type ExchangeGoogleCodeForTokenResponse = {
  accessToken: string
  email: string
}

type ArgsPostGoogleOAuth = {
  code: string
  redirectUrl: string
}

//https://inctagram.work/api/v1/auth/login
export const authApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      exchangeGoogleCodeForToken: build.mutation<
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
      login: build.mutation<any, any>({
        query: body => ({
          body,
          method: 'POST',
          url: 'auth/login',
        }),
      }),
    }
  },
})

export const { useExchangeGoogleCodeForTokenMutation, useLoginMutation } = authApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: builder => ({
    registration: builder.mutation<any, any>({
      query: payload => ({
        body: payload,
        method: 'POST',
        url: 'auth/registration',
      }),
    }),
  }),
  reducerPath: 'authApi',
})

export const {} = authApi

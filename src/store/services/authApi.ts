import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: builder => ({}),
  reducerPath: 'authApi',
})

export const {} = authApi

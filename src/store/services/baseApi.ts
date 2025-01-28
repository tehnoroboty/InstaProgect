import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: headers => {
      // headers.set('API-KEY', `${process.env.NEXT_PUBLIC_SITE_KEY}`)
      // headers.set('Authorization', `Bearer ${localStorage.getItem('sn-token')}`)
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  // tagTypes: ['Todolist', 'Task'],
})

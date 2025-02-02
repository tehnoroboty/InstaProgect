import { setAppError } from '@/src/store/Slices/appSlice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      prepareHeaders: headers => {
        // headers.set('API-KEY', `${process.env.NEXT_PUBLIC_SITE_KEY}`)
        headers.set('Authorization', `Bearer ${localStorage.getItem('sn-token')}`)
      },
    })(args, api, extraOptions)

    return result
  },
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  // tagTypes: ['Todolist', 'Task'],
})

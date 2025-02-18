import { handleError } from '@/src/utils/handleError'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    //для замедления запроса
    //await new Promise(res => setTimeout(res, 5000))
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      credentials: 'include',
      prepareHeaders: headers => {
        // headers.set('API-KEY', `${process.env.NEXT_PUBLIC_SITE_KEY}`)
        headers.set('Authorization', `Bearer ${localStorage.getItem('sn-token')}`)
      },
    })(args, api, extraOptions)

    handleError(api, result)

    return result
  },
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  tagTypes: ['ME'],
})

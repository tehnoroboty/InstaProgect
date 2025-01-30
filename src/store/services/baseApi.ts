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
    let error = 'Some error occurred'

    if (result.error) {
      switch (result.error.status) {
        case 'FETCH_ERROR':
        case 'PARSING_ERROR':
        case 'CUSTOM_ERROR':
          error = result.error.error
          break

        case 403:
          error = '403 Forbidden Error. Check API-KEY'
          break

        case 400:
        case 500:
          error = (result.error.data as { message: string }).message
          break

        default:
          error = JSON.stringify(result.error)
          break
      }
      api.dispatch(setAppError({ error }))
    }

    return result
  },
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  // tagTypes: ['Todolist', 'Task'],
})

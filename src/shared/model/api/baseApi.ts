import { handleError } from '@/src/shared/lib/handleError'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

// create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})
//

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // console.log(args)

  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()

  // Здесь можно добавить задержку для имитации медленного запроса:
  // await new Promise(res => setTimeout(res, 5000))

  let result = await baseQuery(args, api, extraOptions)

  handleError(api, result)
  // console.log(result)

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          {
            // credentials: 'include',
            method: 'POST',
            url: '/auth/update-tokens',
          },
          api,
          extraOptions
        )

        // )as any //что бы не ругалась на типизацию
        // console.log(refreshResult)
        if (
          typeof refreshResult.data === 'object' &&
          refreshResult.data !== null &&
          'accessToken' in refreshResult.data &&
          refreshResult.data?.accessToken &&
          typeof refreshResult.data.accessToken === 'string'
        ) {
          localStorage.setItem('accessToken', refreshResult.data.accessToken)
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          // window.location.href = '/auth/login'
          // window.location.href = '/'
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth, // Используем кастомный baseQuery
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  tagTypes: ['ME', 'POSTS'],
})

import { AUTH_KEYS } from '@/src/shared/lib/constants/auth-keys'
import { handleError } from '@/src/shared/lib/handleError'
import { isTokens } from '@/src/shared/lib/isTokens'
import { baseQuery } from '@/src/shared/model/api/base/baseQuery'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

// create a new mutex
const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // console.log(args)

  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()

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
            url: 'auth/update-tokens',
          },
          api,
          extraOptions
        )

        // )as any //что бы не ругалась на типизацию
        console.log(refreshResult)
        debugger
        if (refreshResult.data && isTokens(refreshResult.data)) {
          debugger
          localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, refreshResult.data.accessToken)
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          // window.location.href = '/auth/login'
          // window.location.href = '/'
        }
      } finally {
        // release must be called once the mutex should be released
        // again.
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

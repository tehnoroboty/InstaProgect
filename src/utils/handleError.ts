import { setAppError } from '@/src/store/Slices/appSlice'
import {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query'

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
  let error = 'Some error occurred'

  if (result.error) {
    switch (result.error.status) {
      case 'FETCH_ERROR':
      case 'PARSING_ERROR':
      case 'CUSTOM_ERROR':
        error = result.error.error
        break

      case 401:
        error = '401 Unauthorized'
        break

      case 429:
        error = '429 More than 5 attempts from one IP-address during 10 seconds'
        break

      case 500:
        error = (result.error.data as { message: string }).message
        break

      default:
        error = JSON.stringify(result.error)
        break
    }
    api.dispatch(setAppError({ error }))
  }
}

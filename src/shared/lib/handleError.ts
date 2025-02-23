import { setAppError } from '@/src/shared/model/slices/appSlice'
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
  let error = null

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
        error = null
        break
    }
    if (error) {
      api.dispatch(setAppError({ error }))
    }
  }
}

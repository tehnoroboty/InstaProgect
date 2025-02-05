export const isLogoutApiError = (
  error: unknown
): error is {
  error: string
  messages: { field: string; message: string }[]
  statusCode: number
} => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'messages' in error &&
    'error' in error
  )
}

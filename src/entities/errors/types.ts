export type ErrorDataType = {
  error: string
  messages: [{ field: string; message: string }]
  statusCode: number
}

export type CustomerError = {
  data: ErrorDataType
  status: number
}

export type LoginError = {
  data: {
    error?: string
    messages: string
    statusCode?: number
  }
  status: number
}

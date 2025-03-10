export type PasswordRecoveryType = {
  baseUrl: string
  email: string
  recaptcha: string
}
export type CreateNewPasswordRecoveryType = {
  newPassword: string
  recoveryCode: string
}

export type ErrorDataType = {
  error: string
  messages: [{ field: string; message: string }]
  statusCode: number
}

export type CustomerError = {
  data: ErrorDataType
  status: number
}

export type RecoveryCodeType = {
  recoveryCode: string
}

export type RecoveryCodeResponse = {
  email: string
}
export type RegistrationType = {
  baseUrl: string
  email: string
  password: string
  userName: string
}

export type OAuthTokenResponse = {
  accessToken: string
  email: string
}

export type ArgsPostGoogleOAuth = {
  code: string
  redirectUrl: string
}

export type LoginError = {
  data: {
    error?: string
    messages: string
    statusCode?: number
  }
  status: number
}

export type RegistrationEmailResending = {
  baseUrl: string
  email: string
}

export type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

export type SortDirection = 'asc' | 'desc'

export type GetMyPostsArgs = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
  userName: string
}

export type GetMyPostsResponse = {
  items: Item[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type Item = {
  avatarWhoLikes: any[]
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location?: any
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

type Owner = {
  firstName?: any
  lastName?: any
}

type Image = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type RequestPostsType = {
  childrenMetadata: { uploadId: string }[]
  description: string
}

export type ResponsePostsType = {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

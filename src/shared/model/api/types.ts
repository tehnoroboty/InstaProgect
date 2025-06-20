import type { Post } from '@/src/entities/post/types'

import { FormType } from '@/src/widgets/generationInformation/validators'

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

export type GetPublicUserPostsArgs = {
  endCursorPostId?: null | number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
  userName: string
}

export type GetPostsArgs = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
  userId: number
}

export type GetProfileWithFollowType = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  followersCount: number
  followingCount: number
  id: number
  isFollowedBy: true
  isFollowing: true
  lastName: string
  publicationsCount: number
  region: string
  userName: string
}

export type GetPostsResponse = {
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
  images: ImageType[]
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

export type ImageType = {
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
  userId: number
}

export type ResponsePostsType = {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: ImageType[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}
export type GetPublicUserProfileArgs = {
  profileId: number
}
export type GetPublicUserProfileResponse = {
  aboutMe: string
  avatars: Avatar[]
  hasPaymentSubscription: boolean
  id: number
  userMetadata: UserMetadata
  userName: string
}

export type UpdatePostModel = {
  description: string
}

type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type UserMetadata = {
  followers: number
  following: number
  publications: number
}

export type GetPublicUserPostsResponse = {
  items: Item[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type Comment = {
  answerCount: number
  content: string
  createdAt: string
  from: {
    avatars: { url: string }[] | Avatar[]
    id: number
    username: string
  }
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export type GetCommentsResponse = {
  items: Comment[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type ModalSuccessType = {
  type: 'error' | 'success'
}

export type PublicPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type UsersCountResponse = { totalCount: number }

export type Notifications = {
  createdAt: string
  id: number
  isRead: boolean
  message: string
}
export type GetNotificationsResponse = {
  items: Notifications[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type GetNotificationsArgs = {
  cursor?: number
  isRead?: boolean
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}

export type InputChangeEvent = {
  target: {
    name: keyof FormType
    value: string
  }
}

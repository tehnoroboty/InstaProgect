export type PostImage = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type Owner = {
  firstName: string
  lastName: string
}

export type Post = {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: PostImage[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

export type SortDirection = 'asc' | 'desc'

export type GetPostsArgs = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
  userId: number
}

export type GetPostsResponse = {
  items: Item[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
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

export type UpdatePostModel = {
  description: string
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

export type GetFolloweePostsArgs = {
  endCursorPostId?: number
  pageNumber?: number
  pageSize?: number
}

export type GetFolloweePostsResponse = {
  items: Post[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type PublicPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

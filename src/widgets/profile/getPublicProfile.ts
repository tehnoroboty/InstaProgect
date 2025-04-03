import { PublicProfileTypes } from '@/src/entities/user/types'
import { GetPostsResponse } from '@/src/shared/model/api/types'

export const getUserProfile = async (userId: string): Promise<PublicProfileTypes> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-user/profile/${userId}`, {
    cache: 'no-store',
  })

  return await res.json()
}

export const getUserPosts = async (userId: string): Promise<GetPostsResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/user/${userId}`, {
    cache: 'no-store',
  })

  return await res.json()
}

// export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export type SearchParams = { [key: string]: string | string[] | undefined }

export const getUserPost = async (postId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/${postId}`, {
    cache: 'no-store',
  })

  return await res.json()
}

export const getUserComments = async (postId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/${postId}/comments`,
    {
      cache: 'no-store',
    }
  )

  return await res.json()
}

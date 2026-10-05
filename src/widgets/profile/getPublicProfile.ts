import { GetCommentsResponse } from '@/src/entities/comments/types'
import { GetPostsResponse, Post } from '@/src/entities/post/types'
import { PublicProfileTypes } from '@/src/entities/users/types'

export const getUserProfile = async (userId: string): Promise<PublicProfileTypes> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-user/profile/${userId}`, {
    cache: 'no-store',
  })

  return await res.json()
}

export const getUserPosts = async (userId: string): Promise<GetPostsResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/user/${userId}?pageSize=8`,
    {
      cache: 'no-cache',
    }
  )

  return await res.json()
}

export type SearchParams = { [key: string]: string | string[] | undefined }

export const getUserPost = async (postId: number): Promise<Post> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/${postId}`, {
    cache: 'no-store',
  })

  return await res.json()
}

export const getUserComments = async (postId: number): Promise<GetCommentsResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/${postId}/comments`,
    {
      cache: 'no-store',
    }
  )

  return await res.json()
}

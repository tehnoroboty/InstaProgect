import { Post } from '@/src/entities/post/types'
import { PublicProfileTypes } from '@/src/entities/user/types'
import { GetCommentsResponse, GetPostsResponse } from '@/src/shared/model/api/types'
import { Profile } from '@/src/widgets/profile/Profile'

const getUserProfile = async (userId: string): Promise<PublicProfileTypes> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-user/profile/${userId}`, {
    cache: 'no-store',
  })

  return await res.json()
}

const getUserPosts = async (userId: string): Promise<GetPostsResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/user/${userId}`, {
    cache: 'no-store',
  })

  return await res.json()
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const getUserPost = async (postId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/${postId}`, {
    cache: 'no-store',
  })

  return await res.json()
}

const getUserComments = async (postId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/${postId}/comments`,
    {
      cache: 'no-store',
    }
  )

  return await res.json()
}

export default async function ProfilePage(props: {
  params: { userId: string }
  searchParams: SearchParams
}) {
  const userProfile = await getUserProfile(props.params.userId)
  const userPosts = await getUserPosts(props.params.userId)
  const searchParams = await props.searchParams
  const query = searchParams.postId
  let post: Post | null = null
  let comments: GetCommentsResponse | null = null

  if (query) {
    try {
      ;[post, comments] = await Promise.all([
        getUserPost(Number(query)),
        getUserComments(Number(query)),
      ])
    } catch (error) {
      console.error('Failed to fetch post:', error)
    }
  }

  const publicProfileNoAuth = {
    comments: comments,
    post: post,
    posts: userPosts,
    profile: userProfile,
  }

  return <Profile publicProfileNoAuth={publicProfileNoAuth} />
}

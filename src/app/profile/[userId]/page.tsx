import { Post } from '@/src/entities/post/types'
import { GetCommentsResponse } from '@/src/shared/model/api/types'
import { Profile } from '@/src/widgets/profile/Profile'
import {
  SearchParams,
  getUserComments,
  getUserPost,
  getUserPosts,
  getUserProfile,
} from '@/src/widgets/profile/getPublicProfile'

export default async function ProfilePage(props: {
  //нужны только посты
  params: { userId: string }
  searchParams: SearchParams
}) {
  const userProfile = await getUserProfile(props.params.userId)
  const userPosts = await getUserPosts(props.params.userId)
  const searchParams = props.searchParams
  const query = searchParams.postId
  let post: Post | null = null
  let comments: GetCommentsResponse | null = null

  if (query) {
    try {
      const results = await Promise.all([
        getUserPost(Number(query)),
        getUserComments(Number(query)),
      ])

      post = results[0]
      comments = results[1]
    } catch (error) {
      console.error('Failed to fetch post:', error)
    }
  }

  const publicProfileNoAuth = {
    comments,
    post,
    posts: userPosts,
    profile: userProfile,
  }

  return <Profile publicProfileNoAuth={publicProfileNoAuth} />
}

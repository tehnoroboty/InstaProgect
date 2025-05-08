import { Profile } from '@/src/widgets/profile/Profile'
import {
  SearchParams,
  getUserPosts,
  getUserProfile,
  getUserPost,
  getUserComments,
} from '@/src/widgets/profile/getPublicProfile'
import { Post } from '@/src/entities/post/types'
import { GetCommentsResponse } from '@/src/shared/model/api/types'

type Props = {
  params: { userId: string }
  searchParams: SearchParams
}

export default async function ProfilePage(props: Props) {
  const userPosts = await getUserPosts(props.params.userId)
  const userProfile = await getUserProfile(props.params.userId)
  const searchParams = props.searchParams
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

  const profileDataFromServer = {
    comments: comments,
    post: post,
    posts: userPosts,
    profile: userProfile,
  }

  return <Profile profileDataFromServer={profileDataFromServer} />
}

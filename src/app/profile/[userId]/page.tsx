import { GetCommentsResponse } from '@/src/entities/comments/types'
import { Post } from '@/src/entities/post/types'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { Profile } from '@/src/widgets/profile/Profile'
import {
  SearchParams,
  getUserComments,
  getUserPost,
  getUserPosts,
  getUserProfile,
} from '@/src/widgets/profile/getPublicProfile'

type Props = {
  params: { userId: string }
  searchParams: SearchParams
}

export default async function ProfilePage(props: Props) {
  const dispatch = useAppDispatch()
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
      const errorMessage =
        error instanceof Error ? error.message : `Failed to fetch post: ${String(error)}`

      dispatch(setAppError({ error: errorMessage }))
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

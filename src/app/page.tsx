import type {
  GetCommentsResponse,
  PublicPostsResponse,
  UsersCountResponse,
} from '@/src/shared/model/api/types'

import { AuthWrapper } from '../features/authWrapper/AuthWrapper'
import { Post } from '@/src/entities/post/types'
import { SearchParams, getUserComments, getUserPost } from '@/src/widgets/profile/getPublicProfile'
import { PublicFeed } from '@/src/widgets/publicFeed/PublicFeed'
import { getUsersCount, getUsersPosts } from '@/src/widgets/publicFeed/getPublicPosts'

export default async function Page(props: {
  params: { postId: string }
  searchParams: SearchParams
}) {
  const publicPosts: PublicPostsResponse = await getUsersPosts()
  const usersCount: UsersCountResponse = await getUsersCount()
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

  const publicFeedInfo = {
    comments,
    count: usersCount,
    post,
    posts: publicPosts,
  }

  return (
    <AuthWrapper>
      <PublicFeed info={publicFeedInfo} />
    </AuthWrapper>
  )
}

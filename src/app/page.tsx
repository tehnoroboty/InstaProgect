import { GetCommentsResponse } from '@/src/entities/comments/types'
import { Post, PublicPostsResponse } from '@/src/entities/post/types'
import { UsersCountResponse } from '@/src/entities/users/types'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { SearchParams, getUserComments, getUserPost } from '@/src/widgets/profile/getPublicProfile'
import { PublicFeed } from '@/src/widgets/publicFeed/PublicFeed'
import { getUsersCount, getUsersPosts } from '@/src/widgets/publicFeed/getPublicPosts'

export default async function Page(props: {
  params: { postId: string }
  searchParams: SearchParams
}) {
  const dispatch = useAppDispatch()
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
      const errorMessage = error instanceof Error ? error.message : String(error)

      dispatch(setAppError({ error: errorMessage }))
    }
  }

  const publicFeedInfo = {
    comments,
    count: usersCount,
    post,
    posts: publicPosts,
  }

  return <PublicFeed info={publicFeedInfo} />
}

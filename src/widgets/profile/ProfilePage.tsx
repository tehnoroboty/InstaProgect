import { fetchPublicUserPosts, fetchPublicUserProfile } from '@/src/shared/model/api/publicApi'

import ClientProfile from './ClientProfile'

type Props = {
  params: { userId: string }
  searchParams: { postId?: string }
}

async function ProfilePage({ params, searchParams }: Props) {
  const userId = Number(params.userId)

  const [publicUserProfile, publicPosts] = await Promise.all([
    fetchPublicUserProfile(userId),
    fetchPublicUserPosts(userId),
  ])

  return (
    <ClientProfile
      publicPosts={publicPosts}
      publicUserProfile={publicUserProfile}
      searchParams={searchParams}
      userId={userId}
    />
  )
}

export default ProfilePage

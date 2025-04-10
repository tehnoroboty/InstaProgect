import { HydrateRtk } from '@/src/shared/lib/hydrateRTK'
import { PublicFeed } from '@/src/widgets/publicFeed/PublicFeed'

import { AuthWrapper } from '../features/authWrapper/AuthWrapper'

export const revalidate = 60

export default async function Page() {
  const usersRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public-user`, {
    cache: 'no-store',
  })
  const usersNumber = await usersRes.json()

  const postsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public-posts/all/0`, {
    cache: 'no-store',
  })
  const posts = await postsRes.json()

  return (
    <AuthWrapper>
      <HydrateRtk posts={posts} usersNumber={usersNumber}>
        <PublicFeed />
      </HydrateRtk>
    </AuthWrapper>
  )
}

import { Profile } from '@/src/widgets/profile/Profile'
import { SearchParams, getUserPosts, getUserProfile } from '@/src/widgets/profile/getPublicProfile'

type Props = {
  params: { userId: string }
  searchParams: SearchParams
}

export default async function ProfilePage(props: Props) {
  const userPosts = await getUserPosts(props.params.userId)
  const userProfile = await getUserProfile(props.params.userId)

  const profileDataFromServer = {
    posts: userPosts,
    profile: userProfile,
  }

  return <Profile profileDataFromServer={profileDataFromServer} />
}

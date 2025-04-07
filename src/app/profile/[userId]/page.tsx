import { Profile } from '@/src/widgets/profile/Profile'

export default async function ProfilePage(props: { params: { userId: string } }) {
  return <Profile />
}

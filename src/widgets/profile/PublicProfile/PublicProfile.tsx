import { PublicProfileTypes } from '@/src/entities/user/types'
import { ProfileInfo } from '@/src/widgets/profile/PublicProfile/profileInfo/ProfileInfo'

import s from '../myProfile.module.scss'

type Props = {
  userProfile: PublicProfileTypes
}

export const PublicProfile = ({ userProfile }: Props) => {
  return (
    <div className={s.page}>
      <ProfileInfo publicUserProfile={userProfile} />
    </div>
  )
}

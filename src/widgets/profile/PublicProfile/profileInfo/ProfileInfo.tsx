import { PublicProfileTypes } from '@/src/entities/user/types'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './profileInfo.module.scss'

type Props = {
  publicUserProfile: PublicProfileTypes | undefined
}

export const ProfileInfo = ({ publicUserProfile }: Props) => {
  if (!publicUserProfile) {
    return null
  }

  const avatarUrl = publicUserProfile?.avatars?.[0]?.url
  const aboutMe = publicUserProfile?.aboutMe
  const publicUserName = publicUserProfile?.userName
  const followingCount = publicUserProfile?.userMetadata.following
  const followersCount = publicUserProfile?.userMetadata.followers
  const publicationsCount = publicUserProfile?.userMetadata.publications

  return (
    <div className={s.profileContainer}>
      <AvatarBox size={'xl'} src={avatarUrl} />
      <div className={s.profileDetails}>
        <div className={s.container}>
          <div className={s.profileInfo}>
            <div className={s.userNameContainer}>
              <Typography as={'h1'} option={'h1'}>
                {publicUserName}
              </Typography>
            </div>
            <div className={s.followersStats}>
              <div className={s.followersStatItem}>
                <Typography as={'span'} option={'bold_text14'}>
                  {followingCount}
                </Typography>
                <Typography as={'span'} option={'regular_text14'}>
                  {'Following'}
                </Typography>
              </div>
              <div className={s.followersStatItem}>
                <Typography as={'span'} option={'bold_text14'}>
                  {followersCount}
                </Typography>
                <Typography as={'span'} option={'regular_text14'}>
                  {'Followers'}
                </Typography>
              </div>
              <div className={s.followersStatItem}>
                <Typography as={'span'} option={'bold_text14'}>
                  {publicationsCount}
                </Typography>
                <Typography as={'span'} option={'regular_text14'}>
                  {'Publications'}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <Typography as={'p'} className={s.profileDescription} option={'regular_text16'}>
          {aboutMe}
        </Typography>
      </div>
    </div>
  )
}

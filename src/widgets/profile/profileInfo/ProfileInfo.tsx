import { useState } from 'react'

import { Profile, PublicProfileTypes } from '@/src/entities/user/types'
import { GetPublicUserProfileResponse } from '@/src/shared/model/api/types'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './profileInfo.module.scss'

type Props = {
  authProfile: boolean
  isMyProfile: boolean
  profile: Profile | PublicProfileTypes
}

export const ProfileInfo = ({ authProfile, isMyProfile, profile }: Props) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const avatarUrl = profile?.avatars?.[0]?.url
  const aboutMe = profile?.aboutMe
  const userName = profile.userName
  const followingCount = /*publicUserProfile?.userMetadata.following*/ 0
  const followersCount = /*publicUserProfile?.userMetadata.followers*/ 0
  const publicationsCount = /*publicUserProfile?.userMetadata.publications*/ 0

  return (
    <div className={s.profileContainer}>
      <AvatarBox size={'xl'} src={avatarUrl} />
      <div className={s.profileDetails}>
        <div className={s.container}>
          <div className={s.profileInfo}>
            <div className={s.userNameContainer}>
              <Typography as={'h1'} option={'h1'}>
                {userName}
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
          <div className={s.buttonsBlock}>
            {authProfile &&
              (isMyProfile ? (
                <Button variant={'secondary'}>{'Profile Settings'}</Button>
              ) : (
                <>
                  <Button onClick={() => setIsFollowing(!isFollowing)} variant={'primary'}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                  <Button variant={'secondary'}>Send Message</Button>
                </>
              ))}
          </div>
        </div>
        <Typography as={'p'} className={s.profileDescription} option={'regular_text16'}>
          {aboutMe}
        </Typography>
      </div>
    </div>
  )
}

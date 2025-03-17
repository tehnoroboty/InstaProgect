'use client'

import { GetPublicUserProfileResponse } from '@/src/shared/model/api/types'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './profileInfo.module.scss'

type Props = {
  isMyProfile: boolean
  publicUserProfile: GetPublicUserProfileResponse | undefined
}

export const ProfileInfo = ({ isMyProfile, publicUserProfile }: Props) => {
  if (!publicUserProfile) {
    return null
  }
  const avatarUrl = publicUserProfile?.avatars?.[0]?.url
  const aboutMe = publicUserProfile?.aboutMe
  const publicUserName = publicUserProfile?.userName
  const followingCount = publicUserProfile?.userMetadata.following
  const followersCount = publicUserProfile?.userMetadata.followers
  const publicationsCount = publicUserProfile?.userMetadata.publications
  const isFollowing = false // Заглушка, пока нет запроса

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
          <div className={s.buttonsBlock}>
            {isMyProfile && <Button variant={'secondary'}>{'Profile Settings'}</Button>}
            {!isMyProfile &&
              (isFollowing ? (
                <Button variant={'primary'}>{'unFollow'}</Button>
              ) : (
                <Button variant={'primary'}>{'Follow'}</Button>
              ))}
            {!isMyProfile && <Button variant={'secondary'}>{'Send Message'}</Button>}
          </div>
        </div>
        <Typography as={'p'} className={s.profileDescription} option={'regular_text16'}>
          {aboutMe}
        </Typography>
      </div>
    </div>
  )
}

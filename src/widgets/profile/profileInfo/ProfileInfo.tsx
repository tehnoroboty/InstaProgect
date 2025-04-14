import { ProfileByUserName, PublicProfileTypes } from '@/src/entities/user/types'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { useRouter } from 'next/navigation'

import s from './profileInfo.module.scss'
import { useFollowMutation, useUnFollowMutation } from '@/src/shared/model/api/followingApi'
import { useState } from 'react'
import { GetProfileWithFollowType } from '@/src/shared/model/api/types'

type Props = {
  authProfile: boolean
  isMyProfile: boolean
  profile: PublicProfileTypes | ProfileByUserName | undefined
}

export const ProfileInfo = ({ authProfile, isMyProfile, profile }: Props) => {
  if (!profile) {
    return
  }
  const router = useRouter()
  const [follow] = useFollowMutation()
  const [unFollow] = useUnFollowMutation()
  const [isFollowing, setIsFollowing] = useState<boolean>(
    (profile as GetProfileWithFollowType)?.isFollowing ?? false
  )
  const avatarUrl = profile?.avatars?.[0]?.url
  const aboutMe = profile?.aboutMe
  const userName = profile?.userName
  const followingCount =
    'userMetadata' in profile
      ? profile.userMetadata.following
      : ((profile as ProfileByUserName)?.followingCount ?? 0)
  const followersCount =
    !authProfile && 'userMetadata' in profile
      ? profile.userMetadata.followers
      : ((profile as ProfileByUserName)?.followersCount ?? 0)
  const publicationsCount =
    !authProfile && 'userMetadata' in profile
      ? profile.userMetadata.publications
      : ((profile as ProfileByUserName)?.publicationsCount ?? 0)

  const onClickFollowingHandler = async () => {
    if (!isFollowing) {
      await follow(profile.id).unwrap()
    } else {
      await unFollow(profile.id).unwrap()
    }
    setIsFollowing(prev => !prev)
  }

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
                <Button
                  onClick={() => router.push(`/profile/${profile.id}/settings/general-information`)}
                  variant={'secondary'}
                >
                  {'Profile Settings'}
                </Button>
              ) : (
                <>
                  <Button onClick={onClickFollowingHandler} variant={'primary'}>
                    {/*{isFollowing ? 'Unfollow' : 'Follow'}*/}
                    Unfollow
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

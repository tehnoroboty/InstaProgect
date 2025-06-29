import { memo, useEffect, useState } from 'react'

import { useFollowMutation, useUnFollowMutation } from '@/src/shared/model/api/followingApi'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { useRouter } from 'next/navigation'

import s from './profileInfo.module.scss'

type Props = {
  authProfile: boolean
  isMyProfile: boolean
  profile: {
    aboutMe: string
    avatarUrl: string
    followersCount: number
    followingCount: number
    id: number
    isFollowing: boolean
    publicationsCount: number
    userName: string
  }
}

export const ProfileInfo = memo(({ authProfile, isMyProfile, profile }: Props) => {
  const router = useRouter()
  const [follow] = useFollowMutation()
  const [unFollow] = useUnFollowMutation()
  const [isFollowing, setIsFollowing] = useState<boolean>(profile.isFollowing)

  useEffect(() => {
    setIsFollowing(profile.isFollowing)
  }, [profile.isFollowing])

  if (!profile) {
    return
  }
  const { aboutMe, avatarUrl, followersCount, followingCount, id, publicationsCount, userName } =
    profile

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
                  onClick={() => router.push(`/profile/${id}/settings/general-information`)}
                  variant={'secondary'}
                >
                  {'Profile Settings'}
                </Button>
              ) : (
                <>
                  <Button onClick={onClickFollowingHandler} variant={'primary'}>
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
})

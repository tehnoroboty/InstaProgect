import { memo, useEffect, useState } from 'react'

import { useFollowMutation, useUnFollowMutation } from '@/src/shared/model/api/followingApi'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { FollowersModal } from '@/src/widgets/profile/profileInfo/followersModal/FollowersModal'
import { FollowingModal } from '@/src/widgets/profile/profileInfo/followingModal/FollowingModal'
import { StatisticsItem } from '@/src/widgets/profile/profileInfo/statisticsItem/StatisticsItem'
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

  const [isOpenFollowersModal, setIsOpenFollowersModal] = useState(false)
  const [isOpenFollowingModal, setIsOpenFollowingModal] = useState(false)

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

  const onOpenFollowersModal = () => {
    setIsOpenFollowersModal(true)
  }
  const onCloseFollowersModal = () => {
    setIsOpenFollowersModal(false)
  }

  const onOpenFollowingModal = () => {
    setIsOpenFollowingModal(true)
  }
  const onCloseFollowingModal = () => {
    setIsOpenFollowingModal(false)
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
              <StatisticsItem
                count={followingCount}
                onClick={onOpenFollowingModal}
                title={'Following'}
              />
              <StatisticsItem
                count={followersCount}
                onClick={onOpenFollowersModal}
                title={'Followers'}
              />
              <StatisticsItem clickable={false} count={publicationsCount} title={'Publications'} />
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
      <FollowingModal
        onClose={onCloseFollowingModal}
        open={isOpenFollowingModal}
        userName={profile.userName}
      />
      <FollowersModal
        onClose={onCloseFollowersModal}
        open={isOpenFollowersModal}
        userName={profile.userName}
      />
    </div>
  )
})

'use client'
import { useState } from 'react'

import { UserFollowItem } from '@/src/entities/followingFollowers/types'
import { useFollowUnfollow } from '@/src/shared/hooks/useFollowUnfollow'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { ConfirmationModal } from '@/src/widgets/editPost/сonfirmationModal/ConfirmationModal'
import { FollowersButtons } from '@/src/widgets/followItemsList/followersButtons/FollowersButtons'
import { FollowingButtons } from '@/src/widgets/followItemsList/followingButtons/FollowingButtons'
import Link from 'next/link'

import s from './followItem.module.scss'

type Props = {
  isFollowers: boolean
  item: UserFollowItem
}

export const FollowItem = ({ isFollowers, item }: Props) => {
  const [openUnfollowModal, setOpenUnfollowModal] = useState(false)

  const { handleFollow, isLoading, isMyProfile } = useFollowUnfollow(item.userId, item.isFollowing)

  return (
    <div className={s.userListItem}>
      <div className={s.avaNameButtons}>
        <Link href={`/profile/${item.userId}`}>
          <UserAvatarName
            url={item?.avatars?.[0]?.url}
            username={item.userName}
            weight={'regular'}
          />
        </Link>
        <div className={s.followButtons}>
          {isFollowers ? (
            <FollowersButtons
              className={s.followButton}
              isFollowing={item.isFollowing}
              isLoading={isLoading}
              isMyProfile={isMyProfile}
              onFollow={handleFollow}
              openModal={setOpenUnfollowModal}
            />
          ) : (
            <FollowingButtons
              className={s.followButton}
              isFollowing={item.isFollowing}
              isLoading={isLoading}
              isMyProfile={isMyProfile}
              onFollow={handleFollow}
              openModal={setOpenUnfollowModal}
            />
          )}
        </div>
      </div>

      <ConfirmationModal
        className={s.confirmationModal}
        modalMessage={`Do you really want to Unfollow from this user ${item.userName}?`}
        modalTitle={'Unfollow'}
        onClickNo={() => setOpenUnfollowModal(false)}
        onCloseModal={() => setOpenUnfollowModal(false)}
        onCloseParentModal={handleFollow}
        open={openUnfollowModal}
      />
    </div>
  )
}

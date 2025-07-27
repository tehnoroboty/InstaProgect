'use client'
import { useState } from 'react'

import { UserFollowItem } from '@/src/entities/followingFollowers/types'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { ConfirmationModal } from '@/src/widgets/editPost/сonfirmationModal/ConfirmationModal'
import { FollowersButtons } from '@/src/widgets/userListItem/followersButtons/FollowersButtons'
import { FollowingButtons } from '@/src/widgets/userListItem/followingButtons/FollowingButtons'
import Link from 'next/link'

import s from './userListItem.module.scss'

type Props = {
  data?: UserFollowItem[]
  isFollowers?: boolean
  onFollow: (userId: number, isCurrentlyFollowing: boolean) => void
}

export const UserListItem = ({ data, isFollowers = false, onFollow }: Props) => {
  const [openUnfollowModal, setOpenUnfollowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<{
    isFollowing: boolean
    userId: number
    userName: string
  } | null>(null)

  const handleConfirmUnfollow = () => {
    if (selectedUser) {
      onFollow(selectedUser.userId, selectedUser.isFollowing)
    }
    setOpenUnfollowModal(false)
  }

  return (
    <div className={s.userListItem}>
      {data?.map(item => (
        <div className={s.avaNameButtons} key={item.id}>
          <Link href={`/profile/${item.userId}`}>
            <UserAvatarName
              url={item?.avatars[0]?.url}
              username={item.userName}
              weight={'regular'}
            />
          </Link>
          {isFollowers ? (
            <FollowersButtons isFollowing={item.isFollowing} />
          ) : (
            <FollowingButtons
              isFollowing={item.isFollowing}
              openModal={setOpenUnfollowModal}
              setSelectedUser={({ isFollowing, userId }) => {
                setSelectedUser({ isFollowing, userId, userName: item.userName })
              }}
              userId={item.userId}
            />
          )}
        </div>
      ))}
      <ConfirmationModal
        className={s.confirmationModal}
        modalMessage={`Do you really want to Unfollow from this user ${selectedUser?.userName}?`}
        modalTitle={'Unfollow'}
        onClickNo={() => setOpenUnfollowModal(false)}
        onCloseModal={() => setOpenUnfollowModal(false)}
        onCloseParentModal={handleConfirmUnfollow}
        open={openUnfollowModal}
      />
    </div>
  )
}

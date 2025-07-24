import { UserFollowItem } from '@/src/entities/followingFollowers/types'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { FollowersButtons } from '@/src/widgets/userListItem/followersButtons/FollowersButtons'
import { FollowingButtons } from '@/src/widgets/userListItem/followingButtons/FollowingButtons'
import Link from 'next/link'

import s from './userListItem.module.scss'

type Props = {
  data?: UserFollowItem[]
  isFollowers?: boolean
}

export const UserListItem = ({ data, isFollowers = false }: Props) => {
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
            <FollowingButtons isFollowing={item.isFollowing} />
          )}
        </div>
      ))}
    </div>
  )
}

import { UserFollowItem } from '@/src/entities/followingFollowers/types'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import Link from 'next/link'

import s from '@/src/widgets/commentItem/commentItem.module.scss'

type Props = {
  data?: UserFollowItem[]
}

export const UserListItem = ({ data }: Props) => {
  return (
    <div>
      {data?.map(item => (
        <div key={item.id}>
          <Link href={`/profile/${item.userId}`}>
            <UserAvatarName
              url={item?.avatars[0]?.url}
              username={item.userName}
              usernameClassName={s.userAvatarName}
              weight={'regular'}
            />
          </Link>
        </div>
      ))}
    </div>
  )
}

import { UserFollowItem } from '@/src/entities/followingFollowers/types'
import { FollowItem } from '@/src/widgets/followItemsList/followItem/FollowItem'

import s from './followItemsList.module.scss'

type Props = {
  data?: UserFollowItem[]
  isFollowers: boolean
}

export const FollowItemsList = ({ data, isFollowers }: Props) => {
  return (
    <div className={s.followItemsList}>
      {data?.map(item => {
        return <FollowItem isFollowers={isFollowers} item={item} key={item.id} />
      })}
    </div>
  )
}

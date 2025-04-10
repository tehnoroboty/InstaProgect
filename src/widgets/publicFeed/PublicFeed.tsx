'use client'

import {
  useGetAllPublicPostsQuery,
  useGetUsersCountQuery,
} from '@/src/shared/model/api/posts/publicPostsApi'
import { Card } from '@/src/shared/ui/card/Card'
import { RegisteredUsersCounter } from '@/src/shared/ui/registeredUsersCounter/RegisteredUsersCounter'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { PublicFeedPost } from '@/src/widgets/publicFeedPost/PublicFeedPost'

import s from './publicFeed.module.scss'

export const PublicFeed = () => {
  const { data: usersNumber } = useGetUsersCountQuery()
  const { data: posts } = useGetAllPublicPostsQuery({ endCursorPostId: 0, pageSize: 4 })

  return (
    <div className={s.container}>
      <div className={s.feed}>
        <Card className={s.registeredUsersContainer}>
          <Typography as={'h2'} option={'h2'}>{`Registered users:`}</Typography>
          {usersNumber && <RegisteredUsersCounter userCount={usersNumber.totalCount} />}
        </Card>
        <div className={s.postsContainer}>
          {posts?.items?.map(post => <PublicFeedPost key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  )
}

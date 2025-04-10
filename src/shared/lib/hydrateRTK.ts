'use client'

import { PropsWithChildren, useEffect } from 'react'

import { publicPostsApi } from '@/src/shared/model/api/posts/publicPostsApi'
import { useAppDispatch } from '@/src/shared/model/store/store'

type Props = {
  posts: import('@/src/shared/model/api/posts/types').PublicPostsResponse
  usersNumber: number
} & PropsWithChildren

export function HydrateRtk({ children, posts, usersNumber }: Props) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      publicPostsApi.util.upsertQueryData('getUsersCount', undefined, { totalCount: usersNumber })
    )
    dispatch(
      publicPostsApi.util.upsertQueryData(
        'getAllPublicPosts',
        { endCursorPostId: 0, pageSize: 4 },
        posts
      )
    )
  }, [dispatch, usersNumber, posts])

  return children
}

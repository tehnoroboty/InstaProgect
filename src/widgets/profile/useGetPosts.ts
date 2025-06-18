import { Dispatch, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'

import { postsApi, useGetPostsQuery } from '@/src/shared/model/api/postsApi'
import { GetPostsResponse, SortDirection } from '@/src/shared/model/api/types'
import { selectLastPostId, setLastPostId } from '@/src/shared/model/slices/postsSlice'
import { useAppSelector } from '@/src/shared/model/store/store'

type Props = {
  dispatch: Dispatch<any>
  postsDataFromServer?: GetPostsResponse
  userId: string
}

const PUBLIC_PAGE_SIZE = 9
const AUTH_PAGE_SIZE = 8
const SORT_BY = 'createdAt'
const SORT_DIRECTION: SortDirection = 'desc'

export const useGetPosts = ({ dispatch, postsDataFromServer, userId }: Props) => {
  const { inView, ref } = useInView({ threshold: 0.1 })
  const selectPostsFromCash = useMemo(
    () => postsApi.endpoints.getPosts.select({ userId: Number(userId) }),
    [userId]
  )

  const { data: postsFromCash } = useAppSelector(state => selectPostsFromCash(state))

  const lastPostId = useAppSelector(selectLastPostId)
  const needInitPostsInStore = !lastPostId && !!postsDataFromServer && !postsFromCash

  useEffect(() => {
    if (needInitPostsInStore && postsDataFromServer) {
      dispatch(
        postsApi.util.upsertQueryData('getPosts', { userId: Number(userId) }, postsDataFromServer)
      )
    }
  }, [needInitPostsInStore, dispatch, postsDataFromServer, userId])

  const params = {
    endCursorPostId: lastPostId || undefined,
    pageSize: lastPostId ? PUBLIC_PAGE_SIZE : AUTH_PAGE_SIZE,
    sortBy: SORT_BY,
    sortDirection: SORT_DIRECTION,
    userId: Number(userId),
  }

  const { data: posts } = useGetPostsQuery(params)
  const totalCount = posts?.totalCount ?? AUTH_PAGE_SIZE
  const postsCount = posts?.items.length ?? totalCount - 1
  const hasMorePosts = totalCount > postsCount

  useEffect(() => {
    if (hasMorePosts && inView) {
      dispatch(setLastPostId({ lastPostId: posts?.items[posts.items.length - 1]?.id }))
    }
  }, [inView, hasMorePosts, dispatch, posts?.items])

  const postsDataForRender = posts?.items || postsFromCash?.items || postsDataFromServer?.items

  return { hasMorePosts, postsDataForRender, ref }
}

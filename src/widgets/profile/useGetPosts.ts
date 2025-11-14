import { Dispatch, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'

import { GetPostsResponse, SortDirection } from '@/src/entities/post/types'
import { postsApi, useGetPostsQuery } from '@/src/shared/model/api/postsApi'
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

  const selectPostsFromCashe = useMemo(
    () => postsApi.endpoints.getPosts.select({ userId: Number(userId) }),
    [userId]
  )
  const { data: postsFromCashe } = useAppSelector(state => selectPostsFromCashe(state))

  const lastPostId = useAppSelector(selectLastPostId)
  const needInitPostsInStore = !lastPostId && !!postsDataFromServer && !postsFromCashe

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

  const items = posts?.items

  useEffect(() => {
    if (!hasMorePosts || !inView) {
      return
    }

    const lastPost = items?.[items.length - 1]

    if (lastPost?.id) {
      dispatch(setLastPostId({ lastPostId: lastPost.id }))
    }
  }, [dispatch, hasMorePosts, inView, items])

  const postsDataForRender = useMemo(() => {
    return posts?.items || postsFromCashe?.items || postsDataFromServer?.items
  }, [posts, postsFromCashe, postsDataFromServer])

  return { hasMorePosts, postsDataForRender, ref }
}

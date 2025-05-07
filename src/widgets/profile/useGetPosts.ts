import { Dispatch, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { postsApi, useLazyGetPostsQuery } from '@/src/shared/model/api/postsApi'
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
  const { inView, ref } = useInView({ threshold: 1 })
  const { data: postsFromCash } = useAppSelector(state =>
    postsApi.endpoints.getPosts.select({ userId: Number(userId) })(state)
  )

  const lastPostId = useAppSelector(selectLastPostId)
  const needInitPostsInStore = !lastPostId && !!postsDataFromServer && !postsFromCash

  const [fetchPosts, { data: posts }] = useLazyGetPostsQuery()

  useEffect(() => {
    if (needInitPostsInStore && postsDataFromServer) {
      dispatch(
        setLastPostId({
          lastPostId: postsDataFromServer.items[postsDataFromServer.items.length - 1].id,
        })
      )
      dispatch(
        postsApi.util.upsertQueryData('getPosts', { userId: Number(userId) }, postsDataFromServer)
      )
    }
  }, [needInitPostsInStore])

  const totalCount = posts?.totalCount ?? AUTH_PAGE_SIZE
  const postsCount = posts?.items.length ?? totalCount - 1
  const hasMorePosts = totalCount > postsCount

  useEffect(() => {
    if (hasMorePosts && inView) {
      if (posts?.items[posts.items.length - 1] === lastPostId) {
        dispatch(setLastPostId({ lastPostId: null }))
      } else {
        dispatch(setLastPostId({ lastPostId: posts?.items[posts.items.length - 1].id }))
      }
    }
  }, [posts])

  useEffect(() => {
    if (lastPostId !== null && lastPostId !== undefined && inView) {
      fetchPosts({
        endCursorPostId: lastPostId,
        pageSize: lastPostId ? PUBLIC_PAGE_SIZE : AUTH_PAGE_SIZE,
        sortBy: SORT_BY,
        sortDirection: SORT_DIRECTION,
        userId: Number(userId),
      })
    }
  }, [inView])

  const postsDataForRender = posts?.items || postsDataFromServer?.items

  return { hasMorePosts, postsDataForRender, ref }
}

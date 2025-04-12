'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Post } from '@/src/entities/post/types'
import { PublicProfileTypes } from '@/src/entities/user/types'
import { useMeQuery } from '@/src/shared/model/api/authApi'
import {
  useGetCommentsQuery,
  useGetPostQuery,
  useGetPostsQuery,
} from '@/src/shared/model/api/postsApi'
import { GetCommentsResponse, GetPostsResponse, SortDirection } from '@/src/shared/model/api/types'
import { useGetMyProfileQuery, useGetUserProfileQuery } from '@/src/shared/model/api/usersApi'
import { selectLastPostId, setLastPostId } from '@/src/shared/model/slices/postsSlice'
import { useAppDispatch, useAppSelector } from '@/src/shared/model/store/store'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import { Typography } from '@/src/shared/ui/typography/Typography'
import ModalPost from '@/src/widgets/modalPost/ModalPost'
import { ProfileInfo } from '@/src/widgets/profile/profileInfo/ProfileInfo'
import clsx from 'clsx'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import s from './myProfile.module.scss'

const PUBLIC_PAGE_SIZE = 9
const AUTH_PAGE_SIZE = 8
const SORT_BY = 'createdAt'
const SORT_DIRECTION: SortDirection = 'desc'

type Props = {
  profile?: {
    comments: GetCommentsResponse | null
    post: Post | null
    posts: GetPostsResponse
    profile: PublicProfileTypes
  }
}

export const Profile = (props: Props) => {
  const dispatch = useAppDispatch()
  const { inView, ref } = useInView({ threshold: 1 })
  const params = useParams<{ userId: string }>()
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const { data: meData } = useMeQuery()
  const authProfile = !!meData
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const isMyProfile = meData?.userId === Number(params.userId)

  // получаем информацию профайл
  const { data: myProfile } = useGetMyProfileQuery()
  const { data: profile } = useGetUserProfileQuery(myProfile?.userName ?? '', {
    skip: !myProfile?.userName,
  })
  // получаем посты
  const lastPostId = useAppSelector(selectLastPostId)
  const { data: posts, isFetching: isFetchingPosts } = useGetPostsQuery({
    endCursorPostId: lastPostId || undefined,
    pageSize: lastPostId ? PUBLIC_PAGE_SIZE : AUTH_PAGE_SIZE,
    sortBy: SORT_BY,
    sortDirection: SORT_DIRECTION,
    userId: Number(params.userId),
  })
  const totalCount = posts?.totalCount ?? AUTH_PAGE_SIZE
  const postsCount = posts?.items.length ?? totalCount
  const hasMorePosts = totalCount > postsCount

  useEffect(() => {
    if (hasMorePosts && inView && isMyProfile && !isFetchingPosts) {
      if (posts?.items[posts.items.length - 1] === lastPostId) {
        dispatch(setLastPostId({ lastPostId: null }))
      } else {
        dispatch(setLastPostId({ lastPostId: posts?.items[posts.items.length - 1]?.id }))
      }
    }
  }, [inView])
  // получаем пост по ID
  const { data: post } = useGetPostQuery(
    { postId: Number(postId) },
    {
      skip: !postId,
    }
  )
  // получаем комменты по ID
  const { data: comments } = useGetCommentsQuery(
    { postId: Number(postId) },
    {
      skip: !postId,
    }
  )

  const closeModal = useCallback(() => {
    setModalIsOpen(false)
    router.replace(`/profile/${params.userId}`, { scroll: false })
  }, [router, params.userId])

  useEffect(() => {
    if (postId) {
      setModalIsOpen(true)
    } else {
      closeModal()
    }
  }, [closeModal, postId])

  const profileDataForRender = profile ? profile : props.profile?.profile
  const postsForRender = authProfile ? posts?.items : props.profile?.posts.items
  const commentsForRender = authProfile ? comments : props.profile?.comments
  const postForRender = authProfile ? post : props.profile?.post

  return (
    <div className={clsx(s.page, [!authProfile && s.noAuthPage])}>
      <ProfileInfo
        authProfile={authProfile}
        isMyProfile={isMyProfile}
        profile={profileDataForRender}
      />
      {isFetchingPosts && <div>Loading ...</div>}
      {!postsForRender ? <div>Пусто</div> : <Posts posts={postsForRender} />}
      {isMyProfile && hasMorePosts && (
        <div className={s.loadMore} ref={ref}>
          <Typography option={'bold_text16'}>Loading...</Typography>
        </div>
      )}
      {commentsForRender && postForRender && (
        <ModalPost
          comments={commentsForRender}
          isAuth={authProfile}
          isMyPost={isMyProfile}
          onClose={closeModal}
          open={modalIsOpen}
          post={postForRender}
        />
      )}
    </div>
  )
}

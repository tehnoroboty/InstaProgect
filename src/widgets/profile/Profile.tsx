'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Post } from '@/src/entities/post/types'
import { PublicProfileTypes } from '@/src/entities/user/types'
import { useMeQuery } from '@/src/shared/model/api/authApi'
import { useGetMyPostsQuery, useGetPublicUserPostsQuery } from '@/src/shared/model/api/postsApi'
import {
  GetCommentsResponse,
  GetPostsResponse,
  Item,
  SortDirection,
} from '@/src/shared/model/api/types'
import { useGetUserProfileQuery } from '@/src/shared/model/api/usersApi'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import ModalPost from '@/src/widgets/modalPost/ModalPost'
import { ProfileInfo } from '@/src/widgets/profile/profileInfo/ProfileInfo'
import clsx from 'clsx'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import s from './myProfile.module.scss'

const AUTH_PAGE_SIZE = 3
const PUBLIC_PAGE_SIZE = 12
const SORT_BY = 'createdAt'
const SORT_DIRECTION: SortDirection = 'desc'

type Props = {
  publicProfileNoAuth: {
    comments: GetCommentsResponse | null
    post: Post | null
    posts: GetPostsResponse
    profile: PublicProfileTypes
  }
}

export const Profile = ({ publicProfileNoAuth }: Props) => {
  const { inView, ref } = useInView({ threshold: 1 })

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [myAllPosts, setMyAllPosts] = useState<Item[]>([])
  const [publicAllPosts, setPublicAllPosts] = useState<Item[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const params = useParams()
  const userId = params.userId

  const { data: meData } = useMeQuery()
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const router = useRouter()
  const authProfile = !!meData
  const isMyProfile = meData?.userId === Number(userId)
  const { data: userProfile, isFetching: isFetchingUserProfile } = useGetUserProfileQuery(
    publicProfileNoAuth.profile.userName,
    {
      skip: !meData || isMyProfile,
    }
  )
  const { data: myProfile, isFetching: isFetchingMyProfile } = useGetUserProfileQuery(
    meData?.userName ?? '',
    {
      skip: !meData || !isMyProfile,
    }
  )

  const authUserProfile = isMyProfile ? myProfile : userProfile
  const profile = authProfile ? authUserProfile : publicProfileNoAuth?.profile

  const pageSize = isMyProfile ? AUTH_PAGE_SIZE : PUBLIC_PAGE_SIZE

  const postsToShow = isMyProfile ? myAllPosts : publicAllPosts

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

  const { data: myPosts, isFetching: isFetchingMyPosts } = useGetMyPostsQuery(
    {
      pageNumber,
      pageSize,
      sortBy: SORT_BY,
      sortDirection: SORT_DIRECTION,
      userName: myProfile?.userName || '',
    },
    { skip: !meData || userProfile }
  )

  const { data: publicPosts, isFetching: isFetchingPublicPosts } = useGetPublicUserPostsQuery(
    {
      // endCursorPostId: '456', // Или undefined для первой страницы
      // pageSize,
      sortBy: SORT_BY,
      sortDirection: SORT_DIRECTION,
      userName: publicProfileNoAuth.profile.userName,
    },
    { skip: !meData || isMyProfile }
  )

  // собираем посты в Личный профиль
  useEffect(() => {
    if (isMyProfile && myPosts?.items) {
      setMyAllPosts(prev => {
        const existingIds = new Set(prev.map(post => post.id))
        const newItems = myPosts.items.filter(post => !existingIds.has(post.id))

        return [...prev, ...newItems]
      })
    }
  }, [myPosts, publicPosts, isMyProfile, params])

  //собираем посты в Публичный профиль
  useEffect(() => {
    if (authProfile && !isMyProfile && publicPosts?.items) {
      setPublicAllPosts(publicPosts.items)
    }
  }, [publicPosts, isMyProfile])

  const totalCount = myPosts?.totalCount ?? pageSize
  const hasMorePosts = Math.ceil(totalCount / pageSize) > pageNumber

  // бесконечный скролл только для личного профиля
  useEffect(() => {
    if (hasMorePosts && inView && isMyProfile && !isFetchingMyPosts) {
      setPageNumber(prevPage => prevPage + 1)
    }
  }, [inView, isFetchingMyPosts, isMyProfile])

  useEffect(() => {
    setMyAllPosts([])
    setPublicAllPosts([])
    setPageNumber(1)
  }, [params.userId])

  return (
    <div className={clsx(s.page, [!authProfile && s.noAuthPage])}>
      <ProfileInfo authProfile={authProfile} isMyProfile={isMyProfile} profile={profile} />
      {isFetchingMyPosts || (isFetchingPublicPosts && <div>Loading ...</div>)}
      <Posts posts={authProfile ? postsToShow : publicProfileNoAuth.posts.items} />
      {isMyProfile && hasMorePosts && (
        <button
          className={s.loadMoreButton}
          disabled={isFetchingMyPosts}
          onClick={() => setPageNumber(prev => prev + 1)}
          ref={ref}
        >
          {isFetchingMyPosts ? 'Загрузка...' : 'Загрузить ещё'}
        </button>
      )}
      <ModalPost
        {...(!authProfile &&
          publicProfileNoAuth && {
            publicComments: publicProfileNoAuth.comments,
            publicPost: publicProfileNoAuth.post,
          })}
        onClose={closeModal}
        open={modalIsOpen}
      />
    </div>
  )
}

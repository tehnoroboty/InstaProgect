'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { useMeQuery } from '@/src/shared/model/api/authApi'
import { useGetMyPostsQuery } from '@/src/shared/model/api/postsApi'
import {
  GetPublicUserPostsResponse,
  GetPublicUserProfileResponse,
  Item,
} from '@/src/shared/model/api/types'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import ModalPost from '@/src/widgets/modalPost/ModalPost'
import { ProfileInfo } from '@/src/widgets/profile/profileInfo/ProfileInfo'
import { useRouter } from 'next/navigation'

import s from './myProfile.module.scss'

type Props = {
  publicPosts: GetPublicUserPostsResponse
  publicUserProfile: GetPublicUserProfileResponse
  searchParams: { postId?: string }
  userId: number
}

const AUTH_PAGE_SIZE = 6
const SORT_BY = 'createdAt'
const SORT_DIRECTION = 'desc'

export default function ClientProfile({
  publicPosts,
  publicUserProfile,
  searchParams,
  userId,
}: Props) {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [myAllPosts, setMyAllPosts] = useState<Item[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { data: meData } = useMeQuery()
  const isAuthenticated = !!meData
  const meUserId = meData?.userId
  const meUserName = meData?.userName
  const postId = searchParams.postId

  const router = useRouter()
  const isMyProfile = isAuthenticated && meUserId === userId
  const pageSize = AUTH_PAGE_SIZE

  const postsToShow = isMyProfile ? myAllPosts : publicPosts.items

  const closeModal = useCallback(() => {
    setModalIsOpen(false)
    router.replace(`/profile/${userId}`)
  }, [router, userId])

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
      userName: meUserName ?? '',
    },
    { skip: !isMyProfile }
  )

  // Собираем посты для личного профиля
  useEffect(() => {
    if (isMyProfile && myPosts?.items) {
      setMyAllPosts(prev => {
        const existingIds = new Set(prev.map(post => post.id))
        const newItems = myPosts.items.filter(post => !existingIds.has(post.id))

        return [...prev, ...newItems]
      })
    }
  }, [myPosts, isMyProfile])

  // Бесконечный скролл для личного профиля
  useEffect(() => {
    if (!isMyProfile) {
      return
    }

    const scrollEl = document.querySelector('main')

    if (!scrollEl) {
      return
    }

    const handleScroll = () => {
      const totalCount = myPosts?.totalCount ?? pageSize

      setPageNumber(prevPage => {
        if (
          scrollEl.scrollHeight - scrollEl.scrollTop <= scrollEl.offsetHeight + 150 &&
          !isFetchingMyPosts &&
          Math.ceil(totalCount / pageSize) > prevPage
        ) {
          return prevPage + 1
        }

        return prevPage
      })
    }

    scrollEl.addEventListener('scroll', handleScroll)

    return () => {
      scrollEl.removeEventListener('scroll', handleScroll)
    }
  }, [myPosts, isFetchingMyPosts, pageNumber, isMyProfile, pageSize])

  return (
    <div className={s.page}>
      <ProfileInfo isMyProfile={isMyProfile} publicUserProfile={publicUserProfile} />
      {postsToShow.length ? <Posts posts={postsToShow} /> : <div>Нет постов</div>}
      {isFetchingMyPosts && isMyProfile && <div>Loader...</div>}
      <ModalPost onClose={closeModal} open={modalIsOpen} />
    </div>
  )
}

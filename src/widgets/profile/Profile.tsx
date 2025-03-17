'use client'
import React, { useCallback, useEffect, useState } from 'react'

import { useMeQuery } from '@/src/shared/model/api/authApi'
import { useGetMyPostsQuery, useGetPublicUserPostsQuery } from '@/src/shared/model/api/postsApi'
import { Item, SortDirection } from '@/src/shared/model/api/types'
import { useGetPublicUserProfileQuery } from '@/src/shared/model/api/usersApi'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import ModalPost from '@/src/widgets/modalPost/ModalPost'
import { ProfileInfo } from '@/src/widgets/profile/profileInfo/ProfileInfo'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import s from './myProfile.module.scss'

const AUTH_PAGE_SIZE = 6
const PUBLIC_PAGE_SIZE = 8
const SORT_BY = 'createdAt'
const SORT_DIRECTION: SortDirection = 'desc'

export const Profile = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [myAllPosts, setMyAllPosts] = useState<Item[]>([])
  const [publicAllPosts, setPublicAllPosts] = useState<Item[]>([])
  const params = useParams() as { userId: string }

  const { data: meData } = useMeQuery()
  const isAuthenticated = !!meData
  const userId = meData?.userId

  const searchParams = useSearchParams()
  const userName = meData?.userName
  const postId = searchParams.get('postId')
  const router = useRouter()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const isMyProfile = isAuthenticated && Number(params.userId) === userId
  const pageSize = isMyProfile ? AUTH_PAGE_SIZE : PUBLIC_PAGE_SIZE

  const closeModal = useCallback(() => {
    setModalIsOpen(false)
    router.replace(`/profile/${params.userId}`)
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
      userName: userName ?? '',
    },
    { skip: !isMyProfile }
  )

  const { data: publicPosts, isFetching: isFetchingPublicPosts } = useGetPublicUserPostsQuery(
    {
      // endCursorPostId: '456', // Или undefined для первой страницы
      // pageSize,
      sortBy: SORT_BY,
      sortDirection: SORT_DIRECTION,
      userId: Number(params.userId),
    },
    { skip: isMyProfile }
  )

  const { data: publicUserProfile } = useGetPublicUserProfileQuery({
    profileId: Number(params.userId),
  })

  // собираем посты в Личный профиль
  useEffect(() => {
    if (isMyProfile && myPosts?.items) {
      setMyAllPosts(prev => {
        const existingIds = new Set(prev.map(post => post.id))
        const newItems = myPosts.items.filter(post => !existingIds.has(post.id))

        return [...prev, ...newItems]
      })
    }
  }, [myPosts, publicPosts, isMyProfile])

  //собираем посты в Публичный профиль
  useEffect(() => {
    if (!isMyProfile && publicPosts?.items) {
      setPublicAllPosts(publicPosts.items)
    }
  }, [publicPosts, isMyProfile])

  // бесконечный скролл только для личного профиля
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
          Math.ceil(totalCount / pageSize) > pageNumber
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

  useEffect(() => {
    setMyAllPosts([])
    setPublicAllPosts([])
    setPageNumber(1)
  }, [params.userId])
  const postsToShow = isMyProfile ? myAllPosts : publicAllPosts

  return (
    <div className={s.page}>
      <ProfileInfo isMyProfile={isMyProfile} publicUserProfile={publicUserProfile} />
      {postsToShow.length && <Posts posts={postsToShow} />}
      {(isFetchingMyPosts || isFetchingPublicPosts) && <div>Loader...</div>}
      <ModalPost onClose={closeModal} open={modalIsOpen} />
    </div>
  )
}

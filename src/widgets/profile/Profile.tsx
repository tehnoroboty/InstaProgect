'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useMeQuery } from '@/src/shared/model/api/authApi'
import { useGetMyPostsQuery, useGetPublicUserPostsQuery } from '@/src/shared/model/api/postsApi'
import { Item, SortDirection } from '@/src/shared/model/api/types'
import { useGetPublicUserProfileQuery } from '@/src/shared/model/api/usersApi'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import { Typography } from '@/src/shared/ui/typography/Typography'
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
  const [allPosts, setAllPosts] = useState<Item[]>([])
  const observerRef = useRef<HTMLDivElement | null>(null)
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
      pageSize,
      sortBy: SORT_BY,
      sortDirection: SORT_DIRECTION,
      userId: Number(params.userId),
    },
    { skip: isMyProfile }
  )

  const { data: publicUserProfile } = useGetPublicUserProfileQuery({
    profileId: Number(params.userId),
  })

  // собираем посты в зависимости от профиля
  useEffect(() => {
    if (isMyProfile && myPosts?.items) {
      setAllPosts(prev => {
        const existingIds = new Set(prev.map(post => post.id))
        const newItems = myPosts.items.filter(post => !existingIds.has(post.id))

        return [...prev, ...newItems]
      })
    } else if (!isMyProfile && publicPosts?.items) {
      setAllPosts(publicPosts.items) // Публичные — только одна порция
    }
  }, [myPosts, publicPosts, isMyProfile])

  useEffect(() => {
    if (!isMyProfile) {
      return
    }

    // бесконечный скролл только для личного профиля
    const observer = new IntersectionObserver(
      entries => {
        const target = entries[0]

        if (target.isIntersecting) {
          setPageNumber(prev => prev + 1)
        }
      },
      { rootMargin: '100px' }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [isMyProfile])

  /*
      // бесконечный скролл
      useEffect(() => {
        if (!isAuthenticated) {
          return
        }
        const scrollEl = document.querySelector('main')

        if (!scrollEl) {
          return
        }

        const handleScroll = () => {
          const totalCount = publicPosts?.totalCount ?? pageSize

          setPageNumber(prevPage => {
            if (
              scrollEl.scrollHeight - scrollEl.scrollTop <= scrollEl.offsetHeight + 150 &&
              !isFetchingPublicPosts &&
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
      }, [publicPosts, isFetchingPublicPosts, pageNumber, isAuthenticated, pageSize])
    */

  return (
    <div className={s.page}>
      <ProfileInfo isMyProfile={isMyProfile} publicUserProfile={publicUserProfile} />
      {allPosts.length > 0 && <Posts posts={allPosts} />}
      {(isFetchingMyPosts || isFetchingPublicPosts) && <div>Loader...</div>}

      {isMyProfile && <div ref={observerRef} style={{ height: '1px' }}></div>}

      <ModalPost onClose={closeModal} open={modalIsOpen} />
    </div>
  )
}

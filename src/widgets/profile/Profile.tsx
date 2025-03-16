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

  const hasNextPage = useCallback(() => {
    if (isMyProfile && myPosts) {
      return myPosts.page < myPosts.pagesCount
    }

    return false
  }, [isMyProfile, myPosts])

  const isEndReached = !hasNextPage()

  // бесконечный скролл только для личного профиля
  useEffect(() => {
    if (!isMyProfile) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        const target = entries[0]

        if (target.isIntersecting && hasNextPage()) {
          setPageNumber(prev => prev + 1)
        }
      },
      { rootMargin: '100px' }
    )
    const currentRef = observerRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [hasNextPage, isMyProfile])

  useEffect(() => {
    setMyAllPosts([])
    setPublicAllPosts([])
    setPageNumber(1)
  }, [params.userId])

  const isLoading = isMyProfile ? isFetchingMyPosts : isFetchingPublicPosts
  const postsToShow = isMyProfile ? myAllPosts : publicAllPosts
  const avatarUrl = publicUserProfile?.avatars?.[0]?.url
  const aboutMe = publicUserProfile?.aboutMe
  const publicUserName = publicUserProfile?.userName
  const followingCount = publicUserProfile?.userMetadata.following
  const followersCount = publicUserProfile?.userMetadata.followers
  const publicationsCount = publicUserProfile?.userMetadata.publications
  const isFollowing = false // Заглушка, пока нет запроса

  return (
    <div className={s.page}>
      <div className={s.profileContainer}>
        <AvatarBox size={'xl'} src={avatarUrl} />
        <div className={s.profileDetails}>
          <div className={s.container}>
            <div className={s.profileInfo}>
              <div className={s.userNameContainer}>
                <Typography as={'h1'} option={'h1'}>
                  {publicUserName}
                </Typography>
              </div>
              <div className={s.followersStats}>
                <div className={s.followersStatItem}>
                  <Typography as={'span'} option={'bold_text14'}>
                    {followingCount}
                  </Typography>
                  <Typography as={'span'} option={'regular_text14'}>
                    {'Following'}
                  </Typography>
                </div>
                <div className={s.followersStatItem}>
                  <Typography as={'span'} option={'bold_text14'}>
                    {followersCount}
                  </Typography>
                  <Typography as={'span'} option={'regular_text14'}>
                    {'Followers'}
                  </Typography>
                </div>
                <div className={s.followersStatItem}>
                  <Typography as={'span'} option={'bold_text14'}>
                    {publicationsCount}
                  </Typography>
                  <Typography as={'span'} option={'regular_text14'}>
                    {'Publications'}
                  </Typography>
                </div>
              </div>
            </div>
            <div className={s.buttonsBlock}>
              {isMyProfile && <Button variant={'secondary'}>{'Profile Settings'}</Button>}
              {!isMyProfile &&
                (isFollowing ? (
                  <Button variant={'primary'}>{'unFollow'}</Button>
                ) : (
                  <Button variant={'primary'}>{'Follow'}</Button>
                ))}
              {!isMyProfile && <Button variant={'secondary'}>{'Send Message'}</Button>}
            </div>
          </div>
          <Typography as={'p'} className={s.profileDescription} option={'regular_text16'}>
            {aboutMe}
          </Typography>
        </div>
      </div>

      {postsToShow.length && <Posts posts={postsToShow} />}
      {isLoading && <div>Loader...</div>}

      {isMyProfile && !isEndReached && (
        <div ref={observerRef} style={{ height: '1px' }}>
          {/* trigger for infinite scroll */}
        </div>
      )}

      <ModalPost onClose={closeModal} open={modalIsOpen} />
    </div>
  )
}

'use client'
import React, { useCallback, useEffect, useState } from 'react'

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
const SORTBY = 'createdAt'
const SORT_DIRECTION: SortDirection = 'desc'

export const Profile = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [allPosts, setAllPosts] = useState<Item[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { data } = useMeQuery()
  const isAuthenticated = !!data
  const userName = data?.userName
  const userId = data?.userId
  const params = useParams() as { userId: string }
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const router = useRouter()

  const isMyProfile = isAuthenticated && Number(params.userId) === userId
  const pageSize = isAuthenticated ? AUTH_PAGE_SIZE : PUBLIC_PAGE_SIZE

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
      sortBy: SORTBY,
      sortDirection: SORT_DIRECTION,
      userName: userName ?? '',
    },
    { skip: !isAuthenticated }
  )

  const { data: publicPosts, isFetching: isFetchingPublicPosts } = useGetPublicUserPostsQuery({
    // endCursorPostId: '456', // Или undefined для первой страницы
    pageSize,
    sortBy: SORTBY,
    sortDirection: SORT_DIRECTION,
    userId: Number(params.userId),
  })

  const { data: publicUserProfile } = useGetPublicUserProfileQuery({
    profileId: Number(params.userId),
  })

  const avatarUrl = publicUserProfile?.avatars?.[0]?.url
  const aboutMe = publicUserProfile?.aboutMe
  const publicUserName = publicUserProfile?.userName
  const followingCount = publicUserProfile?.userMetadata.following
  const followersCount = publicUserProfile?.userMetadata.followers
  const publicationsCount = publicUserProfile?.userMetadata.publications
  const isFollowing = false // Заглушка, пока нет запроса

  useEffect(() => {
    console.log('Updating posts list')
    if (isAuthenticated && myPosts?.items?.length) {
      setAllPosts(prev => [...prev, ...myPosts.items])
    } else if (!isAuthenticated && publicPosts?.items?.length) {
      setAllPosts(publicPosts.items)
    }
  }, [myPosts, publicPosts, isAuthenticated])

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
            <Typography as={'p'} className={s.profileDescription} option={'regular_text16'}>
              {aboutMe}
            </Typography>
          </div>
        </div>
      </div>
      {allPosts.length > 0 && <Posts posts={allPosts} />}
      {isFetchingPublicPosts && <div>Loader...</div>}
      <ModalPost onClose={closeModal} open={modalIsOpen} />
    </div>
  )
}

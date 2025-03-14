'use client'

import React, { useEffect, useState } from 'react'

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

const PAGESIZE = 6
const SORTBY = 'createdAt'
const SORTDIRECTION: SortDirection = 'desc'

export const Profile = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [allPosts, setAllPosts] = useState<Item[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { data } = useMeQuery()
  const userName = data?.userName
  const userId = data?.userId
  const params = useParams() as { userId: string }
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const router = useRouter()

  const closeModal = () => {
    setModalIsOpen(false)
    router.replace(`/profile/${params.userId}`)
  }

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
      pageSize: PAGESIZE,
      sortBy: SORTBY,
      sortDirection: SORTDIRECTION,
      userName: userName ?? '',
    },
    { skip: !userName }
  )

  const { data: publicPosts, isFetching: isFetchingPublicPosts } = useGetPublicUserPostsQuery({
    // endCursorPostId: '456', // Или undefined для первой страницы
    pageSize: PAGESIZE,
    sortBy: SORTBY,
    sortDirection: SORTDIRECTION,
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

  useEffect(() => {
    if (publicPosts?.items?.length) {
      setAllPosts(prev => [...prev, ...publicPosts.items])
    }
  }, [publicPosts])

  useEffect(() => {
    const scrollEl = document.querySelector('main')

    if (scrollEl) {
      const handleScroll = () => {
        const totalCount = publicPosts?.totalCount ?? PAGESIZE

        if (
          scrollEl.scrollHeight - scrollEl.scrollTop <= scrollEl.offsetHeight + 150 &&
          !isFetchingPublicPosts &&
          Math.ceil(totalCount / PAGESIZE) > pageNumber
        ) {
          setPageNumber(prev => prev + 1)
        }
      }

      scrollEl.addEventListener('scroll', handleScroll)

      return () => {
        scrollEl.removeEventListener('scroll', handleScroll)
      }
    }
  }, [publicPosts, isFetchingPublicPosts, pageNumber])

  const onClickHandler = () => {}

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
              {+params.userId === userId && (
                <Button onClick={onClickHandler} type={'button'} variant={'secondary'}>
                  {'Profile Settings'}
                </Button>
              )}

              {+params.userId !== userId && (
                <>
                  <Button onClick={onClickHandler} type={'button'} variant={'primary'}>
                    {'Follow'}
                  </Button>
                  <Button onClick={onClickHandler} type={'button'} variant={'primary'}>
                    {'unFollow'}
                  </Button>
                  <Button onClick={onClickHandler} type={'button'} variant={'secondary'}>
                    {'Send Message'}
                  </Button>
                </>
              )}
            </div>
          </div>
          <Typography as={'p'} className={s.profileDescription} option={'regular_text16'}>
            {aboutMe}
          </Typography>
        </div>
      </div>
      {allPosts.length > 0 && <Posts posts={allPosts} />}
      {isFetchingPublicPosts && <div>Loader...</div>}
      <ModalPost onClose={closeModal} open={modalIsOpen} />
    </div>
  )
}

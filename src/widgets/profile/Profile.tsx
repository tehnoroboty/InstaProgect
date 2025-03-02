'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { useMeQuery } from '@/src/shared/model/api/authApi'
import { useGetMyPostsQuery } from '@/src/shared/model/api/postsApi'
import { SortDirection } from '@/src/shared/model/api/types'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import { Typography } from '@/src/shared/ui/typography/Typography'
import Image from 'next/image'

import s from './myProfile.module.scss'

import { profileData } from './data'

const PAGESIZE = 8
const SORTBY = 'createdAt'
const SORTDIRECTION: SortDirection = 'desc'

export const Profile = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [allPosts, setAllPosts] = useState<any[]>([])

  const { data } = useMeQuery()
  const userName = data?.userName

  const { data: posts, isFetching } = useGetMyPostsQuery(
    {
      pageNumber,
      pageSize: PAGESIZE,
      sortBy: SORTBY,
      sortDirection: SORTDIRECTION,
      userName: userName ?? '',
    },
    { skip: !userName }
  )

  useEffect(() => {
    if (posts?.items?.length) {
      setAllPosts(prev => [...prev, ...posts.items])
    }
  }, [posts])

  // Функция для подгрузки следующей страницы при скролле
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isFetching &&
      posts?.items?.length === PAGESIZE // Если получили ровно 8 постов, значит есть еще данные
    ) {
      setPageNumber(prev => prev + 1)
    }
  }, [isFetching, posts])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isFetching, posts, handleScroll])

  const onClickHandler = () => {}

  return (
    <div className={s.page}>
      <div className={s.profileContainer}>
        <AvatarBox size={'xl'} />
        <div className={s.profileDetails}>
          <div className={s.container}>
            <div className={s.profileInfo}>
              <div className={s.userNameContainer}>
                <Typography as={'h1'} option={'h1'}>
                  {profileData.firstName}
                </Typography>
                <Typography as={'h1'} option={'h1'}>
                  {profileData.lastName}
                </Typography>
              </div>
              <div className={s.followersStats}>
                <div className={s.followersStatItem}>
                  <Typography as={'span'} option={'bold_text14'}>
                    {profileData.followingCount}
                  </Typography>
                  <Typography as={'span'} option={'regular_text14'}>
                    {'Following'}
                  </Typography>
                </div>
                <div className={s.followersStatItem}>
                  <Typography as={'span'} option={'bold_text14'}>
                    {profileData.followersCount}
                  </Typography>
                  <Typography as={'span'} option={'regular_text14'}>
                    {'Followers'}
                  </Typography>
                </div>
                <div className={s.followersStatItem}>
                  <Typography as={'span'} option={'bold_text14'}>
                    {profileData.publicationsCount}
                  </Typography>
                  <Typography as={'span'} option={'regular_text14'}>
                    {'Publications'}
                  </Typography>
                </div>
              </div>
            </div>
            <div>
              <Button onClick={onClickHandler} type={'button'} variant={'secondary'}>
                {'Profile Settings'}
              </Button>
            </div>
          </div>
          <Typography as={'p'} className={s.profileDescription} option={'regular_text16'}>
            {profileData.aboutMe}
          </Typography>
        </div>
      </div>
      {allPosts.length > 0 && (
        <Posts
          posts={allPosts}
          renderItem={post => {
            if (post.images.length !== 0) {
              return <Image alt={'Post image'} height={300} src={post.images[0].url} width={300} />
            }
          }}
        />
      )}
      {isFetching && <div>Loader...</div>}
    </div>
  )
}

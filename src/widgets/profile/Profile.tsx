'use client'

import React, { useEffect, useState } from 'react'

import { useMeQuery } from '@/src/shared/model/api/authApi'
import { useGetMyPostsQuery } from '@/src/shared/model/api/postsApi'
import { Item, SortDirection } from '@/src/shared/model/api/types'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import { Typography } from '@/src/shared/ui/typography/Typography'
import Image from 'next/image'

import s from './myProfile.module.scss'

import { profileData } from './data'

const PAGESIZE = 6
const SORTBY = 'createdAt'
const SORTDIRECTION: SortDirection = 'desc'

export const Profile = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [allPosts, setAllPosts] = useState<Item[]>([])
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

  useEffect(() => {
    const scrollEl = document.querySelector('section')

    if (scrollEl) {
      const handleScroll = () => {
        const totalCount = posts?.totalCount ?? PAGESIZE

        if (
          scrollEl.scrollHeight - scrollEl.scrollTop <= scrollEl.offsetHeight + 150 &&
          !isFetching &&
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
  }, [posts, isFetching])

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
              {false && (
                <Button onClick={onClickHandler} type={'button'} variant={'secondary'}>
                  {'Profile Settings'}
                </Button>
              )}
              {true && (
                <Button onClick={onClickHandler} type={'button'} variant={'secondary'}>
                  {'Profile Settings'}
                </Button>
              )}
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

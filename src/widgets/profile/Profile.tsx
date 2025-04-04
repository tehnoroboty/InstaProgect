'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Post } from '@/src/entities/post/types'
import { PublicProfileTypes } from '@/src/entities/user/types'
import { useMeQuery } from '@/src/shared/model/api/authApi'
import { postsApi, useGetPublicUserPostsQuery } from '@/src/shared/model/api/postsApi'
import {
  GetCommentsResponse,
  GetPostsResponse,
  Item,
  SortDirection,
} from '@/src/shared/model/api/types'
import { useGetUserProfileQuery } from '@/src/shared/model/api/usersApi'
import { useAppSelector, useAppStore } from '@/src/shared/model/store/store'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import { Typography } from '@/src/shared/ui/typography/Typography'
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

  const store = useAppStore()

  // const [myAllPosts, setMyAllPosts] = useState<Item[]>([])
  // const [publicAllPosts, setPublicAllPosts] = useState<Item[]>([])
  // const [allPosts, setAllPosts] = useState<Item[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const params = useParams()
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const router = useRouter()

  const { data: meData } = useMeQuery()
  const authProfile = !!meData

  const isMyProfile = meData?.userId === Number(params.userId)

  //public
  const { data: userProfile, isFetching: isFetchingUserProfile } = useGetUserProfileQuery(
    publicProfileNoAuth.profile.userName,
    {
      skip: !meData || isMyProfile,
    }
  )
  //auth
  const { data: myProfile, isFetching: isFetchingMyProfile } = useGetUserProfileQuery(
    meData?.userName ?? '',
    {
      skip: !meData || !isMyProfile,
    }
  )
  //auth
  const authUserProfile = isMyProfile ? myProfile : userProfile
  //public
  const profile = authProfile ? authUserProfile : publicProfileNoAuth?.profile

  const pageSize = isMyProfile ? AUTH_PAGE_SIZE : PUBLIC_PAGE_SIZE
  // const postsToShow = isMyProfile ? myAllPosts : publicAllPosts
  const postsToShow = isMyProfile ? myAllPosts : publicAllPosts

  const { data: dataPostsFromCache, originalArgs } = useAppSelector(state =>
    postsApi.endpoints.getPublicUserPosts.select()(state)
  )

  // const [pageNumber, setPageNumber] = useState(originalArgs || 1)
  const [endCursorPostId, setEndCursorPostId] = useState(originalArgs?.endCursorPostId)

  const needInitPostsInStore = !!publicProfileNoAuth.posts.items && !dataPostsFromCache

  useEffect(() => {
    if (needInitPostsInStore) {
      store.dispatch(
        postsApi.util.upsertQueryData('getPublicUserPosts', 0, publicProfileNoAuth.posts.items)
      )
    }
  }, [needInitPostsInStore])

  /*
    const { data: myPosts, isFetching: isFetchingPublicPosts } = useGetMyPostsQuery(
      {
        pageNumber,
        pageSize,
        sortBy: SORT_BY,
        sortDirection: SORT_DIRECTION,
        userName: myProfile?.userName || '',
      },
      { skip: needInitPostsInStore && (!meData || userProfile) }
    )
  */

  const { data: publicPosts, isFetching: isFetchingPublicPosts } = useGetPublicUserPostsQuery(
    {
      endCursorPostId,
      pageSize,
      sortBy: SORT_BY,
      sortDirection: SORT_DIRECTION,
      userName: publicProfileNoAuth.profile.userName,
    },
    { skip: needInitPostsInStore }
  )
  // собираем посты в Личный профиль
  /*
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

  */
  const postForRender = publicPosts?.items || publicProfileNoAuth.posts.items

  useEffect(() => {
    if (postForRender.length > 0) {
      setAllPosts(prev => (isMyProfile ? [...prev, ...postForRender] : postForRender))
    }
  }, [postForRender, isMyProfile])

  useEffect(() => {
    setAllPosts([]) // Clear posts on user change
  }, [params.userId])

  /*
    const totalCount = myPosts?.totalCount ?? pageSize
    const hasMorePosts = Math.ceil(totalCount / pageSize) > pageNumber
  
    // бесконечный скролл только для личного профиля
    useEffect(() => {
      if (hasMorePosts && inView && isMyProfile && !isFetchingPublicPosts) {
        setPageNumber(prevPage => prevPage + 1)
      }
    }, [inView, isFetchingPublicPosts, isMyProfile])
  */

  // бесконечный скролл только для личного профиля
  const totalCount = publicPosts?.totalCount ?? pageSize
  const lastPostId = publicPosts?.items?.[publicPosts.items?.length - 1]?.id ?? undefined // ID последнего поста в списке
  const hasMorePosts = (publicPosts?.items?.length ?? 0) < totalCount

  // Infinite scroll for My Profile only
  useEffect(() => {
    if (hasMorePosts && inView && isMyProfile && !isFetchingPublicPosts && lastPostId) {
      setEndCursorPostId(lastPostId) // Обновляем endCursorPostId для загрузки следующей страницы
    }
  }, [hasMorePosts, inView, isFetchingPublicPosts, isMyProfile, lastPostId])

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
  console.log('dataPostsFromCache', dataPostsFromCache)

  console.log('data: ', publicPosts)

  return (
    <div className={clsx(s.page, [!authProfile && s.noAuthPage])}>
      <ProfileInfo authProfile={authProfile} isMyProfile={isMyProfile} profile={profile} />
      {isFetchingPublicPosts && <div>Loading ...</div>}
      <Posts posts={authProfile ? postsToShow : publicProfileNoAuth.posts.items} />
      {isMyProfile && hasMorePosts && (
        <div className={s.loadMore} ref={ref}>
          {isFetchingPublicPosts && <Typography option={'bold_text16'}>Loading...</Typography>}
        </div>
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

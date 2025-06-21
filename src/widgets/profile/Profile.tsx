'use client'
import React, { useCallback } from 'react'

import { Post } from '@/src/entities/post/types'
import { PublicProfileTypes } from '@/src/entities/user/types'
import { useMeQuery } from '@/src/shared/model/api/authApi'
import { GetCommentsResponse, GetPostsResponse } from '@/src/shared/model/api/types'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import { Typography } from '@/src/shared/ui/typography/Typography'
import ModalPost from '@/src/widgets/modalPost/ModalPost'
import { ProfileInfo } from '@/src/widgets/profile/profileInfo/ProfileInfo'
import { useGetPosts } from '@/src/widgets/profile/useGetPosts'
import { useGetProfile } from '@/src/widgets/profile/useGetProfile'
import clsx from 'clsx'
import { useParams, useRouter } from 'next/navigation'

import s from './myProfile.module.scss'

type Props = {
  profileDataFromServer: {
    comments: GetCommentsResponse | null
    post: Post | null
    posts: GetPostsResponse
    profile: PublicProfileTypes
  }
}

export const Profile = (props: Props) => {
  const dispatch = useAppDispatch()
  const { data: meData } = useMeQuery()
  const authProfile = !!meData
  const params = useParams<{ userId: string }>()
  const isMyProfile = meData?.userId === Number(params.userId)
  const router = useRouter()

  const closeModal = useCallback(() => {
    router.replace(`/profile/${params.userId}`, { scroll: false })
  }, [params.userId, router])

  const { hasMorePosts, postsDataForRender, ref } = useGetPosts({
    dispatch,
    postsDataFromServer: props.profileDataFromServer.posts,
    userId: params.userId,
  })

  const { profileDataForRender } = useGetProfile({
    authProfile,
    dispatch,
    isMeDataUserName: !!meData?.userName,
    profileDataFromServer: props.profileDataFromServer.profile,
    userId: params.userId,
  })

  return (
    <div className={clsx(s.page, [!authProfile && s.noAuthPage])}>
      <ProfileInfo
        authProfile={authProfile}
        isMyProfile={isMyProfile}
        profile={profileDataForRender}
      />
      {!postsDataForRender ? <div>Пусто</div> : <Posts posts={postsDataForRender} />}
      {hasMorePosts && (
        <div className={s.loadMore} ref={ref}>
          <Typography option={'bold_text16'}>Loading...</Typography>
        </div>
      )}
      <ModalPost
        commentsDataFromServer={props.profileDataFromServer.comments}
        isAuth={authProfile}
        isMyPost={isMyProfile}
        onClose={closeModal}
        postDataFromServer={props.profileDataFromServer.post}
      />
    </div>
  )
}

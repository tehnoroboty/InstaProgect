import React from 'react'

import { PublicProfileTypes } from '@/src/entities/user/types'
import { GetMyPostsResponse } from '@/src/shared/model/api/types'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import { ProfileInfo } from '@/src/widgets/profile/PublicProfile/profileInfo/ProfileInfo'

import s from '../myProfile.module.scss'

type Props = {
  userPosts: GetMyPostsResponse
  userProfile: PublicProfileTypes
}

export const PublicProfile = ({ userPosts, userProfile }: Props) => {
  const { items: posts } = userPosts

  return (
    <div className={s.page}>
      <ProfileInfo publicUserProfile={userProfile} />
      {posts.length && <Posts posts={posts} />}
    </div>
  )
}

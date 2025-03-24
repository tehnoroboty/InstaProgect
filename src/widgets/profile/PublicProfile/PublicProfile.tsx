import React from 'react'

import { Post } from '@/src/entities/post/types'
import { PublicProfileTypes } from '@/src/entities/user/types'
import { GetMyPostsResponse } from '@/src/shared/model/api/types'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import { ProfileInfo } from '@/src/widgets/profile/PublicProfile/profileInfo/ProfileInfo'

import s from '../myProfile.module.scss'

type Props = {
  post: Post | null
  userPosts: GetMyPostsResponse
  userProfile: PublicProfileTypes
}

export const PublicProfile = ({ post, userPosts, userProfile }: Props) => {
  const { items: posts } = userPosts

  return (
    <div className={s.page}>
      <ProfileInfo publicUserProfile={userProfile} />
      {posts.length && <Posts post={post} posts={posts} />}
    </div>
  )
}

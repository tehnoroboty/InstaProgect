'use client'
import React, { useState } from 'react'

import { Post } from '@/src/entities/post/types'
import { PublicProfileTypes } from '@/src/entities/user/types'
import { GetCommentsResponse, GetMyPostsResponse } from '@/src/shared/model/api/types'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import ModalPost from '@/src/widgets/modalPost/ModalPost'
import { ProfileInfo } from '@/src/widgets/profile/PublicProfile/profileInfo/ProfileInfo'

import s from '../myProfile.module.scss'

type Props = {
  publicComments: GetCommentsResponse | null
  publicPost: Post | null
  userPosts: GetMyPostsResponse
  userProfile: PublicProfileTypes
}

export const PublicProfile = ({ publicComments, publicPost, userPosts, userProfile }: Props) => {
  const { items: posts } = userPosts
  const [modalPublicPost, setModalPublicPost] = useState<boolean>(true)

  return (
    <div className={s.page}>
      <ProfileInfo publicUserProfile={userProfile} />
      {posts.length && <Posts posts={posts} />}
      {publicPost && publicComments && (
        <ModalPost
          onClose={() => setModalPublicPost(false)}
          open={modalPublicPost}
          publicComments={publicComments}
          publicPost={publicPost}
        />
      )}
    </div>
  )
}

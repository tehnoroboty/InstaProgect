'use client'
import React, { useEffect, useState } from 'react'

import { Post } from '@/src/entities/post/types'
import { PublicProfileTypes } from '@/src/entities/user/types'
import { GetCommentsResponse, GetPostsResponse } from '@/src/shared/model/api/types'
import { Posts } from '@/src/shared/ui/postsGrid/Posts'
import ModalPost from '@/src/widgets/modalPost/ModalPost'
import { ProfileInfo } from '@/src/widgets/profile/PublicProfile/profileInfo/ProfileInfo'
import { useSearchParams } from 'next/navigation'

import s from '../myProfile.module.scss'

type Props = {
  publicComments: GetCommentsResponse | null
  publicPost: Post | null
  userPosts: GetPostsResponse
  userProfile: PublicProfileTypes
}

export const PublicProfile = ({ publicComments, publicPost, userPosts, userProfile }: Props) => {
  const { items: posts } = userPosts
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const [modalPublicPost, setModalPublicPost] = useState<boolean>(true)

  useEffect(() => {
    setModalPublicPost(!!postId)
  }, [postId])

  return (
    <div className={s.page}>
      <ProfileInfo publicUserProfile={userProfile} />
      {posts.length && <Posts posts={posts} publicPost={publicPost} />}
      {publicPost && publicComments && modalPublicPost && (
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

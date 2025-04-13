'use client'

import type { Post } from '@/src/entities/post/types'

import React, { useCallback, useEffect, useState } from 'react'

import {
  useGetAllPublicPostsQuery,
  useGetCommentsQuery,
  useGetUsersCountQuery,
} from '@/src/shared/model/api/posts/publicPostsApi'
import { Card } from '@/src/shared/ui/card/Card'
import { RegisteredUsersCounter } from '@/src/shared/ui/registeredUsersCounter/RegisteredUsersCounter'
import { Typography } from '@/src/shared/ui/typography/Typography'
import ModalPost from '@/src/widgets/modalPost/ModalPost'
import { PublicFeedPost } from '@/src/widgets/publicFeedPost/PublicFeedPost'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './publicFeed.module.scss'

export const PublicFeed = () => {
  const { data: usersNumber } = useGetUsersCountQuery()
  const { data: posts } = useGetAllPublicPostsQuery({ endCursorPostId: 0, pageSize: 4 })

  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
    router.push(`/?postId=${post.id}`, { scroll: false })
  }
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const router = useRouter()

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setSelectedPost(null)
    router.push(`/`, { scroll: false })
  }, [router, postId])

  useEffect(() => {
    if (postId) {
      setModalOpen(true)
    } else {
      closeModal()
    }
  }, [postId])

  const { data: publicComments } = useGetCommentsQuery(Number(postId))

  console.log('postId from URL:', postId)
  console.log('isModalOpen:', isModalOpen)
  console.log('posts:', posts)

  return (
    <div className={s.container}>
      <div className={s.feed}>
        <Card className={s.registeredUsersContainer}>
          <Typography as={'h2'} option={'h2'}>{`Registered users:`}</Typography>
          {usersNumber?.totalCount != null && (
            <RegisteredUsersCounter userCount={usersNumber.totalCount} />
          )}
        </Card>
        <div className={s.postsContainer}>
          {posts?.items?.map(post => (
            <PublicFeedPost key={post.id} onClick={() => handlePostClick(post)} post={post} />
          ))}
        </div>
      </div>

      {isModalOpen && selectedPost && (
        <ModalPost
          onClose={closeModal}
          open
          // publicComments={publicComments}
          publicPost={selectedPost}
        />
      )}
    </div>
  )
}

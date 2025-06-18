'use client'

import type { Post } from '@/src/entities/post/types'
import type {
  GetCommentsResponse,
  PublicPostsResponse,
  UsersCountResponse,
} from '@/src/shared/model/api/types'

import React, { useCallback, useEffect, useState } from 'react'

import { Card } from '@/src/shared/ui/card/Card'
import { RegisteredUsersCounter } from '@/src/shared/ui/registeredUsersCounter/RegisteredUsersCounter'
import { Typography } from '@/src/shared/ui/typography/Typography'
import ModalPost from '@/src/widgets/modalPost/ModalPost'
import { PublicFeedPost } from '@/src/widgets/publicFeedPost/PublicFeedPost'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './publicFeed.module.scss'

type Props = {
  info: {
    comments: GetCommentsResponse | null
    count: UsersCountResponse
    post: Post | null
    posts: PublicPostsResponse
  }
}

export const PublicFeed = ({ info }: Props) => {
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
  }, [router])

  useEffect(() => {
    if (postId) {
      setModalOpen(true)
      const selected = info.posts.items.find(post => post.id === Number(postId))

      setSelectedPost(selected ?? null)
    } else {
      setModalOpen(false)
      setSelectedPost(null)
    }
  }, [postId, info.posts])

  return (
    <div className={s.container}>
      <div>
        <Card className={s.registeredUsersContainer}>
          <Typography as={'h2'} option={'h2'}>{`Registered users:`}</Typography>
          {info.count?.totalCount != null && (
            <RegisteredUsersCounter userCount={info.count.totalCount} />
          )}
        </Card>
        <div className={s.postsContainer}>
          {info.posts?.items?.map(post => (
            <PublicFeedPost key={post.id} onClick={() => handlePostClick(post)} post={post} />
          ))}
        </div>
      </div>

      {isModalOpen && selectedPost && (
        <ModalPost
          commentsDataFromServer={info.comments}
          isAuth={false}
          isMyPost={false}
          onClose={closeModal}
          postDataFromServer={info.post}
        />
      )}
    </div>
  )
}

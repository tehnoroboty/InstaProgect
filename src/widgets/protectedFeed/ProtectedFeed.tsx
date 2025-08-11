'use client'

import type { Post } from '@/src/entities/post/types'

import { useEffect, useRef, useState } from 'react'

import { usePostModal } from '@/src/shared/hooks/usePostModal'
import { useGetFolloweePostsQuery } from '@/src/shared/model/api/postsApi'
import { Loader } from '@/src/shared/ui/loader/Loader'
import ModalPost from '@/src/widgets/modalPost/ModalPost'
import { ProtectedFeedPost } from '@/src/widgets/protectedFeedPost/ProtectedFeedPost'

import s from './protectedFeed.module.scss'

export const ProtectedFeed = () => {
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const [allPosts, setAllPosts] = useState<Post[]>([])

  const { close, open } = usePostModal()

  const { data, isFetching, isLoading } = useGetFolloweePostsQuery(
    {
      endCursorPostId: cursor,
      pageSize: 10,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  useEffect(() => {
    if (data?.items) {
      setAllPosts(prev => [
        ...prev,
        ...data.items.filter(newPost => !prev.some(p => p.id === newPost.id)),
      ])
    }
  }, [data?.items])

  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = observerRef.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries

        if (entry.isIntersecting && data?.nextCursor && cursor !== data.nextCursor) {
          setCursor(data.nextCursor)
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [data?.nextCursor, cursor])

  return (
    <div className={s.container}>
      <div className={s.feed}>
        {allPosts.map(post => (
          <ProtectedFeedPost key={post.id} {...post} onModalOpen={() => open(String(post.id))} />
        ))}
        <div ref={observerRef} style={{ height: 1 }} />
      </div>
      {(isLoading || isFetching) && <Loader />}
      <ModalPost
        commentsDataFromServer={null}
        isAuth
        isMyPost={false}
        onClose={close}
        postDataFromServer={null}
      />
    </div>
  )
}

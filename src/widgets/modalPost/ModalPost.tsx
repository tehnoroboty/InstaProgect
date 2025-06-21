import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Post } from '@/src/entities/post/types'
import ImageNotFound from '@/src/shared/assets/componentsIcons/ImageNotFound'
import { postsApi, useGetCommentsQuery, useGetPostQuery } from '@/src/shared/model/api/postsApi'
import { GetCommentsResponse, ImageType } from '@/src/shared/model/api/types'
import { useAppDispatch, useAppSelector } from '@/src/shared/model/store/store'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { ModalCommentsSection } from '@/src/widgets/commentsSection/ModalCommentsSection'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import s from './modalPost.module.scss'

type Props = {
  commentsDataFromServer: GetCommentsResponse
  isAuth: boolean
  isMyPost: boolean
  onClose: () => void
  postDataFromServer: Post
}

export default function ModalPost({
  commentsDataFromServer,
  isAuth,
  isMyPost,
  onClose,
  postDataFromServer,
}: Props) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const dispatch = useAppDispatch()

  const closeModal = useCallback(() => {
    setModalIsOpen(false)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (postId) {
      setModalIsOpen(true)
    } else {
      closeModal()
    }
  }, [closeModal, postId])

  const selectPost = useMemo(() => postsApi.endpoints.getPost.select(Number(postId)), [postId])
  const selectComments = useMemo(
    () => postsApi.endpoints.getComments.select(Number(postId)),
    [postId]
  )

  const { data: postFromCash } = useAppSelector(state => selectPost(state))
  const { data: commentsFromCash } = useAppSelector(state => selectComments(state))

  const needInitCommentsInStore = !!commentsDataFromServer && !commentsFromCash
  const needInitPostInStore = !!postDataFromServer && !postFromCash

  useEffect(() => {
    if (needInitPostInStore || !postFromCash) {
      dispatch(postsApi.util.upsertQueryData('getPost', Number(postId), postDataFromServer))
    }
  }, [dispatch, needInitPostInStore, postDataFromServer, postFromCash, postId])

  useEffect(() => {
    if (needInitCommentsInStore && !!commentsDataFromServer) {
      dispatch(postsApi.util.upsertQueryData('getComments', Number(postId), commentsDataFromServer))
    }
  }, [commentsDataFromServer, dispatch, needInitCommentsInStore, postId])

  const { data: post } = useGetPostQuery(Number(postId), {
    skip: !needInitPostInStore && !Number(postId) && postFromCash?.id === Number(postId),
  })
  const { data: comments } = useGetCommentsQuery(Number(postId), {
    skip: !needInitCommentsInStore,
  })

  const postForRender = useMemo(() => {
    return post || postFromCash || postDataFromServer
  }, [post, postFromCash, postDataFromServer])

  const commentsForRender = useMemo(() => {
    return comments?.items || commentsFromCash?.items || commentsDataFromServer?.items || []
  }, [comments, commentsFromCash, commentsDataFromServer])

  if (!postForRender || !commentsForRender) {
    return null
  }

  const isCarousel = postForRender.images.length > 1

  const renderItem = (item: ImageType) => {
    return item ? (
      <Image alt={'post'} className={s.image} height={490} priority src={item.url} width={562} />
    ) : (
      <div className={s.notFound}>
        <ImageNotFound height={194} width={199} />
        <div>
          <b>No Image</b>
        </div>
      </div>
    )
  }

  return (
    <>
      <Dialog
        className={s.dialog}
        closeClassName={s.closeClassName}
        onClose={closeModal}
        open={modalIsOpen}
      >
        <div className={s.container}>
          {isCarousel ? (
            <Carousel list={postForRender.images} renderItem={renderItem} size={'large'} />
          ) : (
            renderItem(postForRender.images[0])
          )}
          <ModalCommentsSection
            commentsData={commentsForRender}
            isAuth={isAuth}
            isMyPost={isMyPost}
            post={postForRender}
          />
        </div>
      </Dialog>
    </>
  )
}

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Post } from '@/src/entities/post/types'
import ImageNotFound from '@/src/shared/assets/componentsIcons/ImageNotFound'
import { GetCommentsResponse, ImageType } from '@/src/shared/model/api/types'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { ModalCommentsSection } from '@/src/widgets/commentsSection/ModalCommentsSection'
import Image from 'next/image'

import s from './modalPost.module.scss'
import { useAppDispatch, useAppSelector } from '@/src/shared/model/store/store'
import { postsApi, useGetCommentsQuery, useGetPostQuery } from '@/src/shared/model/api/postsApi'
import { useParams, useSearchParams } from 'next/navigation'

type Props = {
  commentsDataFromServer: GetCommentsResponse | null
  isAuth: boolean
  isMyPost: boolean
  postDataFromServer: Post | null
  onClose: () => void
}

export default function ModalPost({
  commentsDataFromServer,
  isAuth,
  isMyPost,
  postDataFromServer,
  onClose,
}: Props) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const dispatch = useAppDispatch()

  const params = useParams<{ userId: string }>()

  const closeModal = useCallback(() => {
    setModalIsOpen(false)
    onClose()
  }, [params.userId])

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
    if (needInitPostInStore) {
      dispatch(postsApi.util.upsertQueryData('getPost', Number(postId), postDataFromServer))
    }
  }, [needInitPostInStore])

  useEffect(() => {
    if (needInitCommentsInStore && !!commentsDataFromServer) {
      dispatch(postsApi.util.upsertQueryData('getComments', Number(postId), commentsDataFromServer))
    }
  }, [needInitCommentsInStore])

  const { data: post } = useGetPostQuery(Number(postId), {
    skip: !needInitPostInStore && !Number(postId),
  })
  const { data: comments } = useGetCommentsQuery(Number(postId), {
    skip: !needInitCommentsInStore,
  })

  const postForRender = post || postFromCash || postDataFromServer
  const commentsForRender =
    comments?.items || commentsFromCash?.items || commentsDataFromServer?.items || []

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

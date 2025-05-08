import React, { useEffect } from 'react'

import { Post } from '@/src/entities/post/types'
import ImageNotFound from '@/src/shared/assets/componentsIcons/ImageNotFound'
import { GetCommentsResponse, ImageType } from '@/src/shared/model/api/types'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { ModalCommentsSection } from '@/src/widgets/commentsSection/ModalCommentsSection'
import Image from 'next/image'

import s from './modalPost.module.scss'
import { useAppDispatch, useAppSelector } from '@/src/shared/model/store/store'
import { postsApi } from '@/src/shared/model/api/postsApi'
import { useSearchParams } from 'next/navigation'

type Props = {
  commentsDataFromServer: GetCommentsResponse | null
  isAuth: boolean
  isMyPost: boolean
  onClose: () => void
  open: boolean
  postDataFromServer: Post | null
}

export default function ModalPost({
  commentsDataFromServer,
  isAuth,
  isMyPost,
  onClose,
  open,
  postDataFromServer,
}: Props) {
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const dispatch = useAppDispatch()

  const { data: postFromCash } = useAppSelector(state =>
    postsApi.endpoints.getPost.select({ postId: Number(postId) })(state)
  )
  const { data: commentsFromCash } = useAppSelector(state =>
    postsApi.endpoints.getComments.select({ postId: Number(postId) })(state)
  )

  const needInitCommentsInStore = !!commentsDataFromServer && !commentsFromCash
  const needInitPostInStore = !!postDataFromServer && !postFromCash

  useEffect(() => {
    if (needInitPostInStore) {
      dispatch(
        postsApi.util.upsertQueryData('getPost', { postId: Number(postId) }, postDataFromServer)
      )
    }
  }, [needInitPostInStore])
  useEffect(() => {
    if (needInitCommentsInStore && !!commentsDataFromServer) {
      dispatch(
        postsApi.util.upsertQueryData(
          'getComments',
          { postId: Number(postId) },
          commentsDataFromServer
        )
      )
    }
  }, [needInitCommentsInStore])

  const postForRender = postFromCash || postDataFromServer
  const commentsForRender = commentsFromCash?.items || commentsDataFromServer?.items || []

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
      <Dialog className={s.dialog} closeClassName={s.closeClassName} onClose={onClose} open={open}>
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

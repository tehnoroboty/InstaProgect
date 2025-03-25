import { useCallback } from 'react'

import { useGetCommentsQuery, useGetPostQuery } from '@/src/shared/model/api/postsApi'
import { ImageType } from '@/src/shared/model/api/types'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { ModalCommentsSection } from '@/src/widgets/commentsSection/ModalCommentsSection'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import s from './modalPost.module.scss'

type Props = {
  onClose: () => void
  open: boolean
}

export default function ModalPost(props: Props) {
  const { onClose, open } = props
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const numericPostId = postId ? Number(postId) : null
  const { data: post, refetch: refetchPost } = useGetPostQuery(
    { postId: numericPostId! },
    { skip: !numericPostId }
  )
  const { data: comments } = useGetCommentsQuery(
    { postId: numericPostId! },
    { skip: !numericPostId }
  )

  // const handlePostUpdated = useCallback(async () => {
  //   try {
  //     await refetchPost().unwrap()
  //   } catch (error) {
  //     console.error('Failed to refetch post:', error)
  //   }
  // }, [refetchPost])

  if (!post) {
    return null
  }
  const isCarousel = post.images.length > 1
  const renderItem = (item: ImageType) => (
    <Image alt={'post'} className={s.image} height={490} src={item.url} width={562} />
  )
  const commentsData = comments?.items ?? []

  return (
    <>
      <Dialog className={s.dialog} closeClassName={s.closeClassName} onClose={onClose} open={open}>
        <div className={s.container}>
          {isCarousel ? (
            <Carousel list={post.images} renderItem={renderItem} size={'large'} />
          ) : (
            renderItem(post.images[0])
          )}
          <ModalCommentsSection
            commentsData={commentsData}
            // onPostUpdated={handlePostUpdated}
            post={post}
          />
        </div>
      </Dialog>
    </>
  )
}

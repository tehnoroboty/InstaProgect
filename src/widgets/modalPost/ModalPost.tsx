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
  const postId = searchParams.get('postId') ?? 10
  const { data: post } = useGetPostQuery({ postId: Number(postId) })
  const { data: comments } = useGetCommentsQuery({ postId: Number(postId) })

  if (!post) {
    return null
  }
  const isCarousel = post.images.length > 1
  const renderItem = (item: ImageType) => (
    <Image alt={'post'} height={300} src={item.url} width={300} />
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
          <ModalCommentsSection commentsData={commentsData} post={post} />
        </div>
      </Dialog>
    </>
  )
}

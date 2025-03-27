import { useCallback, useEffect, useState } from 'react'

import { Post } from '@/src/entities/post/types'
import { useGetCommentsQuery, useGetPostQuery } from '@/src/shared/model/api/postsApi'
import { GetCommentsResponse, ImageType } from '@/src/shared/model/api/types'
import { useGetUserProfileQuery } from '@/src/shared/model/api/usersApi'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { ModalCommentsSection } from '@/src/widgets/commentsSection/ModalCommentsSection'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import s from './modalPost.module.scss'

type Props = {
  onClose: () => void
  open: boolean
  publicComments?: GetCommentsResponse
  publicPost?: Post
}

export default function ModalPost(props: Props) {
  const { onClose, open } = props
  const [postPublicStatus, setPostPublicStatus] = useState<boolean>(true)
  const [isMyPost, setIsMyPost] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const numericPostId = postId ? Number(postId) : null

  const { data: myProfile } = useGetUserProfileQuery()
  const { data: authPost } = useGetPostQuery(
    { postId: numericPostId! },
    { skip: !numericPostId || !!props.publicPost }
  )
  const { data: authComments } = useGetCommentsQuery(
    { postId: numericPostId! },
    { skip: !numericPostId || !!props.publicPost }
  )

  useEffect(() => {
    setPostPublicStatus(!authPost)
  }, [authPost])

  useEffect(() => {
    const newValue = myProfile?.id === authPost?.ownerId

    setIsMyPost(prev => (prev !== newValue ? newValue : prev))
  }, [myProfile, authPost])

  const post = props.publicPost ? props.publicPost : authPost
  const comments = props.publicPost ? props.publicComments : authComments

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
            isMyPost={isMyPost}
            post={post}
            postPublicStatus={postPublicStatus}
          />
        </div>
      </Dialog>
    </>
  )
}

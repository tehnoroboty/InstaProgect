import type { Post, PostImage } from '@/src/entities/post/types'

import { useState } from 'react'

import { useGetCommentsQuery } from '@/src/shared/model/api/commentsAnswersApi'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { CreationTime } from '@/src/shared/ui/creationTime/CreationTime'
import { PostLikesBox } from '@/src/shared/ui/postLikesBox/PostLikesBox'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { AddCommentForm } from '@/src/widgets/addCommentForm/AddCommentForm'
import { DropdownPost } from '@/src/widgets/dropdownPost/DropdownPost'
import { InteractionBar } from '@/src/widgets/interactionBar/InteractionBar'
import { WhoLikeModal } from '@/src/widgets/profile/profileInfo/whoLikeModal/whoLikeModal'
import clsx from 'clsx'
import Image from 'next/image'

import s from './protectedFeedPost.module.scss'

type Props = Post & {
  onModalOpen: () => void
}

export const ProtectedFeedPost = (props: Props) => {
  const { avatarOwner, createdAt, description, id, images, onModalOpen, userName } = props

  const renderImgCarousel = (img: PostImage) => {
    return (
      <Image
        alt={''}
        className={s.img}
        height={img.height}
        onClick={onModalOpen}
        src={img.url}
        width={img.width}
      />
    )
  }

  const { data } = useGetCommentsQuery(id)

  const isFollowedBy = true
  const isOurPost = false
  const showViewCommentsBtn = (data?.items?.length ?? 0) > 0

  const [isWhoLikeModalOpen, setIsWhoLikeModalOpen] = useState(false)

  const onOpenWhoLikeModal = () => {
    setIsWhoLikeModalOpen(true)
  }
  const onCloseWhoLikeModal = () => {
    setIsWhoLikeModalOpen(false)
  }

  return (
    <div className={s.card} id={String(id)}>
      <div className={s.cardHeader}>
        <div className={s.cardHeaderGroup}>
          <UserAvatarName className={s.owner} url={avatarOwner} username={userName} />
          <CreationTime createdAt={createdAt} />
        </div>
        <DropdownPost isFollowedBy={isFollowedBy} isOurPost={isOurPost} />
      </div>
      <div className={s.carouselContainer}>
        <Carousel list={images} renderItem={renderImgCarousel} size={'large'} />
      </div>
      <div className={s.cardBody}>
        <InteractionBar postId={id} />
        <div className={s.infoContainer}>
          <AvatarBox className={s.avatar} size={'xs'} src={avatarOwner} />
          <p className={s.postInfo}>
            <span className={s.userName}>{userName}</span> {description}
          </p>
        </div>
        <PostLikesBox
          className={clsx(s.likesBox, { [s.noMargin]: !showViewCommentsBtn })}
          onClick={onOpenWhoLikeModal}
          postId={id}
        />
        {showViewCommentsBtn && (
          <Button className={s.viewCommentsBtn} onClick={onModalOpen} variant={'transparent'}>
            {`View All Comments (${data?.items.length})`}
          </Button>
        )}
        <AddCommentForm
          className={s.addCommentContainer}
          postId={id}
          textAreaClassName={s.textArea}
          textAreaWrapperClassName={s.textareaContainer}
        />
        <WhoLikeModal onClose={onCloseWhoLikeModal} open={isWhoLikeModalOpen} postId={id} />
      </div>
    </div>
  )
}

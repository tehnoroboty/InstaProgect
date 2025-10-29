import type { Post, PostImage } from '@/src/entities/post/types'

import React, { useState } from 'react'

import ImageNotFound from '@/src/shared/assets/componentsIcons/ImageNotFound'
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
import Link from 'next/link'

import s from './protectedFeedPost.module.scss'

type Props = Post & {
  onViewCommentsClick: () => void
}

export const ProtectedFeedPost = (props: Props) => {
  const {
    avatarOwner,
    createdAt,
    description,
    id,
    images,
    onViewCommentsClick,
    ownerId,
    userName,
  } = props

  const renderImgCarousel = (img: PostImage) => {
    return (
      <Image
        alt={''}
        className={s.img}
        height={img.height}
        priority
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
          <Link href={`/profile/${ownerId}`}>
            <UserAvatarName
              className={s.owner}
              url={avatarOwner}
              username={userName}
              usernameClassName={s.userName}
            />
          </Link>
          <CreationTime createdAt={createdAt} />
        </div>
        <DropdownPost isFollowedBy={isFollowedBy} isOurPost={isOurPost} />
      </div>
      <div className={s.carouselContainer}>
        {images.length > 0 ? (
          <Carousel list={images} renderItem={renderImgCarousel} size={'large'} />
        ) : (
          <div className={s.notFound}>
            <ImageNotFound height={194} width={199} />
            <div>
              <b>No Image</b>
            </div>
          </div>
        )}
      </div>
      <div className={s.cardBody}>
        <InteractionBar postId={id} />
        <div className={s.infoContainer}>
          <Link className={s.userName} href={`/profile/${ownerId}`}>
            <AvatarBox className={s.avatar} size={'xs'} src={avatarOwner} />
          </Link>
          <p className={s.postInfo}>
            <Link className={s.userName} href={`/profile/${ownerId}`}>
              <span>{userName}</span>
            </Link>{' '}
            {description}
          </p>
        </div>
        <PostLikesBox
          className={clsx(s.likesBox, { [s.noMargin]: !showViewCommentsBtn })}
          onClick={onOpenWhoLikeModal}
          postId={id}
        />
        {showViewCommentsBtn && (
          <Button
            className={s.viewCommentsBtn}
            onClick={onViewCommentsClick}
            variant={'transparent'}
          >
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

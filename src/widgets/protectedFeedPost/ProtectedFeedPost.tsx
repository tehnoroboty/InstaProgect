import type { Comment } from '@/src/entities/comment/types'
import type { Post, PostImage } from '@/src/entities/post/types'
import type { Avatar } from '@/src/entities/user/types'

import React from 'react'

import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { CreationTime } from '@/src/shared/ui/creationTime/CreationTime'
import { PostLikesBox } from '@/src/shared/ui/postLikesBox/PostLikesBox'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { DropdownPost } from '@/src/widgets/dropdownPost/DropdownPost'
import { InteractionBar } from '@/src/widgets/interactionBar/InteractionBar'
import Image from 'next/image'

import s from './protectedFeedPost.module.scss'

export const ProtectedFeedPost = (props: Post) => {
  const { avatarOwner, createdAt, description, id, images, likesCount, userName } = props

  const renderImgCarousel = (img: PostImage) => {
    return <Image alt={''} className={s.img} height={img.height} src={img.url} width={img.width} />
  }

  const mockAvatars: Avatar[] = [
    {
      createdAt: '2025-02-17T16:36:44.101Z',
      fileSize: 300,
      height: 512,
      url: 'https://i.pinimg.com/736x/39/6d/f5/396df568a4325fe46c4a4801e198e7ef.jpg',
      width: 512,
    },
    {
      createdAt: '2025-02-17T16:36:44.101Z',
      fileSize: 300,
      height: 710,
      url: 'https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k',
      width: 660,
    },
    {
      createdAt: '2025-02-17T16:36:44.101Z',
      fileSize: 300,
      height: 1440,
      url: 'https://www.newsnationnow.com/wp-content/uploads/sites/108/2022/07/Cat.jpg?w=2560&h=1440&crop=1',
      width: 2560,
    },
  ]

  //TODO: запрос за комментариями к посту по айди поста
  const mockComments: Comment[] = [
    {
      answerCount: 0,
      content: 'Abshdjbsdkjshdjkhssd',
      createdAt: '2025-03-01T16:36:44.101Z',
      from: { avatars: mockAvatars[0], id: 2, username: 'Boba' },
      id: 123,
      isLiked: true,
      likeCount: 1,
      postId: 1,
    },
    {
      answerCount: 10,
      content: 'ewoweiopewiopwepiwepiwewopeweew',
      createdAt: '2025-03-01T16:36:44.101Z',
      from: { avatars: mockAvatars[1], id: 3, username: 'Lopa' },
      id: 234,
      isLiked: false,
      likeCount: 15,
      postId: 1,
    },
    {
      answerCount: 340,
      content: 'Lorem Ipsum lroewwhihwehweweewweieweeeeeeeeeeeeejhsddsd',
      createdAt: '2025-03-01T16:36:44.101Z',
      from: { avatars: mockAvatars[2], id: 23, username: 'Biba' },
      id: 235,
      isLiked: true,
      likeCount: 120,
      postId: 1,
    },
  ]

  const isFollowedBy = true //TODO: запрос за пользователем, чтобы узнать, фолловиим ли мы его
  const isOurPost = false // TODO: сравнить есть ли пост с таким айди у нас

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
        <InteractionBar />
        <div className={s.infoContainer}>
          <AvatarBox className={s.avatar} size={'xs'} src={avatarOwner} />
          <p className={s.postInfo}>
            <span className={s.userName}>{userName}</span> {description}
          </p>
        </div>
        <PostLikesBox avatars={mockAvatars} className={s.likesBox} likesCount={likesCount} />
        <Button className={s.viewCommentsBtn} onClick={() => {}} variant={'transparent'}>
          {`View All Comments (${mockComments.length})`}
        </Button>
        <div className={s.addCommentContainer}>
          <div className={s.textareaContainer}>
            <TextArea className={s.textArea} label={''} placeholder={'Add a Comment...'} />
          </div>
          <Button variant={'transparent'}>{'Publish'}</Button>
        </div>
      </div>
    </div>
  )
}

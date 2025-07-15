import type { Post, PostImage } from '@/src/entities/post/types'

import { useGetCommentsQuery } from '@/src/shared/model/api/postsApi'
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
  const { avatarOwner, avatarWhoLikes, createdAt, description, id, images, likesCount, userName } =
    props

  const renderImgCarousel = (img: PostImage) => {
    return <Image alt={''} className={s.img} height={img.height} src={img.url} width={img.width} />
  }

  const likesAvatars = avatarWhoLikes.map(avatar => ({ url: avatar }))

  const { data } = useGetCommentsQuery(id)

  const isFollowedBy = true
  const isOurPost = false

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
        <PostLikesBox avatars={likesAvatars} className={s.likesBox} likesCount={likesCount} />
        <Button className={s.viewCommentsBtn} onClick={() => {}} variant={'transparent'}>
          {`View All Comments (${data?.items.length})`}
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

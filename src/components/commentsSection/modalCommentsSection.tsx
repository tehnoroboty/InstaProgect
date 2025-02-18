'use client'

import { useState } from 'react'

import {
  BookmarkOutline,
  LogOutOutline,
  SettingsOutline,
  TrendingUpOutline,
} from '@/src/assets/componentsIcons'
import Heart from '@/src/assets/componentsIcons/Heart'
import HeartOutline from '@/src/assets/componentsIcons/HeartOutline'
import { AvatarBox } from '@/src/components/avatar/AvatarBox'
import { DropdownMenuMobile } from '@/src/components/header/header-mob/dropdown-menu/DropdownMenu'
import { TextArea } from '@/src/components/textArea/TextArea'
import { Typography } from '@/src/components/typography/Typography'

import s from './modalCommentsSection.module.scss'

import { Button } from '../button/Button'

export type ProfileData = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region: string
  userName: string
}

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

type Props = {
  isLiked: boolean
  userData?: ProfileData
}

// comment type
export type Comment = {
  answerCount: number
  content: string
  createdAt: string
  from: User
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export type User = {
  avatars: Avatar[]
  id: number
  username: string
}

export const ModalCommentsSection = ({ isLiked, userData }: Props) => {
  //const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    //setIsLiked(isLiked => !isLiked)
  }

  return (
    <div className={s.commentsBox}>
      <div className={s.commentsHeader}>
        <div className={s.userAvaName}>
          <div className={s.userAva}>
            <AvatarBox
              className={s.smallAva}
              size={{ height: '36px', width: '36px' }}
              src={userData?.avatars[0].url}
            />
          </div>
          <div className={s.userName}>
            <Typography size={'m'} weight={'semi-bold'}>
              {userData?.userName ? userData.userName : 'UserName'}
            </Typography>
          </div>
        </div>
        <div className={s.postMenu}>{<DropdownMenuMobile items={menuDropdown} />}</div>
      </div>

      <div className={s.commentsBody}>
        {fakeComments.map((el, index) => (
          <div className={s.usersCommentBody} key={el.id}>
            <div className={s.userAva}>
              <AvatarBox
                className={s.smallAva}
                size={{ height: '36px', width: '36px' }}
                src={userData?.avatars[0].url}
              />
            </div>
            <div className={s.userComment}>
              <div className={s.userName}>
                <Typography size={'s'} weight={'bold'}>
                  {userData?.userName ? userData.userName : 'UserName'}
                </Typography>
              </div>
              <div>
                <Typography size={'s'} weight={'regular'}>
                  {el.comment}
                </Typography>
              </div>
            </div>
            <Heart className={isLiked ? s.red : s.heartIcon} onClick={handleLike} />
          </div>
        ))}
      </div>
      <div className={s.postActions}>
        <div className={s.interactionBar}></div>
        <div className={s.postLikes}></div>
        <div className={s.postDate}></div>
      </div>
      <div className={s.addComment}>
        <div className={s.textareaWrapper}>
          <TextArea className={s.textarea} label={''} placeholder={'Add a Comment...'} />
        </div>
        <Button variant={'transparent'}>{'Publish'}</Button>
      </div>
    </div>
  )
}

const menuDropdown: any = [
  { href: '/statistics', icon: <TrendingUpOutline />, title: 'Statistics' },
  { href: '/favorites', icon: <BookmarkOutline />, title: 'Favorites' },
  { href: '/settings', icon: <SettingsOutline />, title: 'Profile Settings' },
  { icon: <LogOutOutline />, title: 'Log Out' },
]

export const fakeComments = [
  {
    comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, exercitationem?',
    id: '1',
    timeAgo: '2 hours ago Answer',
    userName: 'userName',
  },
  {
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque delectus ea est hic perferendis quos!',
    id: '2',
    timeAgo: '2 hours ago Like: 1 Answer',
  },
]

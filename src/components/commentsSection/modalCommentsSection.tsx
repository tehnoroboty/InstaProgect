// 'use client'

import {
  BookmarkOutline,
  LogOutOutline,
  SettingsOutline,
  TrendingUpOutline,
} from '@/src/assets/componentsIcons'
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
  userData?: ProfileData
}

export const ModalCommentsSection = ({ userData }: Props) => {
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
              {userData?.userName ? userData.userName : 'userName'}
            </Typography>
          </div>
        </div>
        <div className={s.postMenu}>{<DropdownMenuMobile items={menuDropdown} />}</div>
      </div>

      <div className={s.commentsBody}></div>
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

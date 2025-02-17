// 'use client'

import {
  BookmarkOutline,
  LogOutOutline,
  SettingsOutline,
  TrendingUpOutline,
} from '@/src/assets/componentsIcons'
import { DropdownMenuMobile } from '@/src/components/header/header-mob/dropdown-menu/DropdownMenu'
import { TextArea } from '@/src/components/textArea/TextArea'
import { Typography } from '@/src/components/typography/Typography'

import s from './modalCommentsSection.module.scss'

import { Button } from '../button/Button'

export const ModalCommentsSection = () => {
  return (
    <div className={s.commentsBox}>
      <div className={s.commentsHeader}>
        <div className={s.userAvaName}>
          <div className={s.userAva}></div>
          <div className={s.userName}>
            <Typography size={'m'} weight={'semi-bold'}>
              {'userName'}
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

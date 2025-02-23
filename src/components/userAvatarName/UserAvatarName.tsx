import { ComponentPropsWithoutRef } from 'react'

import { AvatarBox } from '@/src/components/avatar/AvatarBox'
import { Typography } from '@/src/components/typography/Typography'
import clsx from 'clsx'

import s from '@/src/components/userAvatarName/userAvatarName.module.scss'

type Props = {
  url: string
  username: string
} & ComponentPropsWithoutRef<'div'>
export const UserAvatarName = ({ className, url, username }: Props) => {
  return (
    <div className={clsx(s.userAvaName, className)}>
      <div className={s.userAva}>
        <AvatarBox size={'xs'} src={url} />
      </div>
      <div className={s.userName}>
        <Typography size={'m'} weight={'semi-bold'}>
          {username}
        </Typography>
      </div>
    </div>
  )
}

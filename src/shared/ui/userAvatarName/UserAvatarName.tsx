import { ComponentPropsWithoutRef } from 'react'

import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from '@/src/shared/ui/userAvatarName/userAvatarName.module.scss'

type Props = {
  url: string
  username: string
  usernameClassName?: string
} & ComponentPropsWithoutRef<'div'>
export const UserAvatarName = ({
  className,
  url = '',
  username = 'UserName',
  usernameClassName,
}: Props) => {
  return (
    <div className={clsx(s.userAvaName, className)}>
      <div className={s.userAva}>
        <AvatarBox size={'xs'} src={url} />
      </div>
      <div className={usernameClassName}>
        <Typography size={'m'} weight={'semi-bold'}>
          {username}
        </Typography>
      </div>
    </div>
  )
}

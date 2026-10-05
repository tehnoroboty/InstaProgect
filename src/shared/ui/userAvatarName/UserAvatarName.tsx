import { ComponentPropsWithoutRef } from 'react'

import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from '@/src/shared/ui/userAvatarName/userAvatarName.module.scss'

type Props = {
  url: string
  username: string
  usernameClassName?: string
  weight?: 'bold' | 'medium' | 'regular' | 'semi-bold'
} & ComponentPropsWithoutRef<'div'>
export const UserAvatarName = ({
  className,
  url = '',
  username = 'UserName',
  usernameClassName,
  weight = 'semi-bold',
}: Props) => {
  return (
    <div className={clsx(s.userAvaName, className)}>
      <div className={s.userAva}>
        <AvatarBox size={'xs'} src={url} />
      </div>
      <div className={usernameClassName}>
        <Typography size={'m'} weight={weight}>
          {username}
        </Typography>
      </div>
    </div>
  )
}

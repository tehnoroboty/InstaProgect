import { ComponentPropsWithoutRef } from 'react'

import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'
import Link from 'next/link'

import s from '@/src/shared/ui/userAvatarName/userAvatarName.module.scss'

type Props = {
  linkHref?: string
  url: string
  username: string
} & ComponentPropsWithoutRef<'div'>
export const UserAvatarName = ({
  className,
  linkHref = '',
  url = '',
  username = 'UserName',
}: Props) => {
  return (
    <div className={clsx(s.userAvaName, className)}>
      <div className={s.userAva}>
        <AvatarBox size={'xs'} src={url} />
      </div>
      <div className={s.userName}>
        <Link href={linkHref}>
          <Typography size={'m'} weight={'semi-bold'}>
            {username}
          </Typography>
        </Link>
      </div>
    </div>
  )
}

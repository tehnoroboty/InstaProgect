// @flow
import * as React from 'react'

import { Typography } from '@/src/components/typography/Typography'

import s from './headerMobile.module.scss'

import { DropdownMenuMobile } from './dropdown-menu/DropdownMenu'

type Props = {
  isLoggedIn?: boolean
  notification?: boolean
  title: string
}

export const HeaderMobile = (props: Props) => {
  const { isLoggedIn = true, title } = props

  return (
    <div className={s.container}>
      <Typography as={'h1'} option={'Large'}>
        {title}
      </Typography>
      <div className={s.headerActions}>
        <select></select>
        {isLoggedIn && <DropdownMenuMobile />}
      </div>
    </div>
  )
}

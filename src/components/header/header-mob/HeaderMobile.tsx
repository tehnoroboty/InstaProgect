// @flow
import * as React from 'react'

import s from './headerMobile.module.scss'

import { DropdownMenuMobile } from './dropdown-menu/DropdownMenu'

export type Props = {
  isLoggedIn?: boolean
  notification?: boolean
  title: string
}

export const HeaderMobile = (props: Props) => {
  const { isLoggedIn, title } = props

  return (
    <div className={s.container}>
      <h1 className={s.title}>{title}</h1>
      <div className={s.headerActions}>
        <select></select>
        {isLoggedIn && <DropdownMenuMobile />}
      </div>
    </div>
  )
}

// @flow
import * as React from 'react'

import { DropdownNotification } from '@/src/components/header/dropdown-notification/DropdownNotification'
import { SelectLanguage } from '@/src/components/selectBox/SelectLanguage/SelectLanguage'

import s from './headerWeb.module.scss'

import { Button } from '../../button/Button'

type Props = {
  hasNotification?: boolean
  isLoggedIn?: boolean
  title: string
}

export const HeaderWeb = (props: Props) => {
  const { hasNotification, isLoggedIn, title } = props

  return (
    <div className={s.container}>
      <h1 className={s.title}>{title}</h1>
      <div className={s.headerActions}>
        {isLoggedIn && hasNotification && <DropdownNotification />}
        <SelectLanguage />
        {!isLoggedIn ? (
          <div className={s.buttons}>
            <Button variant={'transparent'}>{'Sing in'}</Button>
            <Button variant={'primary'}>{'Sing up'}</Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

// @flow
import * as React from 'react'
import s from './headerWeb.module.scss'
import { Button } from '../../button/Button'
import { DropdownNotification } from '@/src/components/header/dropdown-notification/DropdownNotification'
import { SelectLanguage } from '@/src/components/selectBox/SelectLanguage/SelectLanguage'

export type Props = {
  title: string
  notification?: boolean
  isLoggedIn?: boolean
}

export const HeaderWeb = (props: Props) => {
  const { title, isLoggedIn, notification } = props
  return (
    <div className={s.container}>
      <h1 className={s.title}>{title}</h1>
      <div className={s.headerActions}>
        {isLoggedIn && notification && <DropdownNotification />}
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

// @flow
import * as React from 'react'
import s from './headerW.module.scss'
import { Button } from '../../button/Button'
import { DropdownNotification } from '@/src/components/header/dropdown-notification/DropdownNotification'

export type Props = {
  title: string
  notification?: boolean
  isLoggedIn?: boolean
}

export const HeaderW = (props: Props) => {
  const { title, isLoggedIn, notification } = props
  return (
    <div className={s.container}>
      <h1 className={s.title}>{title}</h1>
      <div className={s.headerActions}>
        {isLoggedIn && notification && <DropdownNotification />}
        <select></select>
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

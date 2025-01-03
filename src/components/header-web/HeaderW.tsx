// @flow
import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'
import s from './headerW.module.scss'
import { Button } from '../button/Button'
import { DropdownNotification } from './dropdown-notification/dropdown-notification'

export type Props = {
  title: string
  notification?: Notification[]
  isLoggedIn?: boolean
} & ComponentPropsWithoutRef<'header'>

export const HeaderW = (props: Props) => {
  return (
    <header {...props} className={s.header}>
      <div className={s.container}>
        <h1 className={s.title}>{props.title}</h1>
        <div className={s.headerActions}>
          {props.isLoggedIn && props.notification && <DropdownNotification />}
          <select></select>
          {!props.isLoggedIn ? (
            <div className={s.buttons}>
              <Button variant={'transparent'}>{'Sing in'}</Button>
              <Button variant={'primary'}>{'Sing up'}</Button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

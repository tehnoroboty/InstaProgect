// @flow
import * as React from 'react'

import { DropdownNotification } from '@/src/components/header/dropdown-notification/DropdownNotification'
import { SelectLanguage } from '@/src/components/select/SelectLanguage/SelectLanguage'
import { Typography } from '@/src/components/typography/Typography'

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
      <Typography as={'h1'} option={'Large'}>
        {title}
      </Typography>
      <div className={s.headerActions}>
        {isLoggedIn && hasNotification && <DropdownNotification />}
        <SelectLanguage />
        {!isLoggedIn && (
          <div className={s.buttons}>
            <Button variant={'transparent'}>{'Sing in'}</Button>
            <Button variant={'primary'}>{'Sing up'}</Button>
          </div>
        )}
      </div>
    </div>
  )
}

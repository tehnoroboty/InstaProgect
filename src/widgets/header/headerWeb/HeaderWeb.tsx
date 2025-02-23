// @flow
import * as React from 'react'

import { SelectLanguage } from '@/src/shared/ui/select/SelectLanguage/SelectLanguage'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { DropdownNotification } from '@/src/widgets/header/dropdownNotification/DropdownNotification'

import s from './headerWeb.module.scss'

import { Button } from '../../../shared/ui/button/Button'

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
            <Button variant={'transparent'}>{'Sign in'}</Button>
            <Button variant={'primary'}>{'Sign up'}</Button>
          </div>
        )}
      </div>
    </div>
  )
}

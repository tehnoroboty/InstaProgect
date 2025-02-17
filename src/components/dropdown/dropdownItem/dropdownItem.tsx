'use client'

import React from 'react'

import { Typography } from '@/src/components/typography/Typography'
import clsx from 'clsx'

import s from './dropdownItem.module.scss'

import { Button } from '../../button/Button'

type DropdownMenuItemWithLinkProps = {
  Icon: React.ElementType
  onClick?: () => void
  title: React.ReactNode
}

export const DropdownItem = ({ Icon, onClick, title }: DropdownMenuItemWithLinkProps) => {
  const onClickHandler = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <>
      <Button as={'button'} className={s.item} onClick={onClickHandler} variant={'transparent'}>
        <Icon className={clsx(s.icon)} />
        <Typography as={'span'} className={clsx(s.itemTitle)} option={'bold_text14'}>
          {title}
        </Typography>
      </Button>
    </>
  )
}

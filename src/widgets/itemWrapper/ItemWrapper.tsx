'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useLogoutMutation } from '@/src/shared/model/api/authApi'
import { setIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { Dialog } from '@/src/shared/ui/dialog/Dialog'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import s from './itemWrapper.module.scss'

import { Button } from '../../shared/ui/button/Button'

type DropdownMenuItemWithLinkProps = {
  Icon: React.ElementType
  IconActive?: React.ElementType
  href?: string
  onClick?: () => void
  title: React.ReactNode
}

export const ItemWrapper = ({
  Icon,
  IconActive,
  href,
  onClick,
  title,
}: DropdownMenuItemWithLinkProps) => {
  const pathname = usePathname()
  const isActive = href === pathname
  const CurrentIcon = isActive ? IconActive || Icon : Icon

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const [logout, { isLoading }] = useLogoutMutation()

  const dispatch = useDispatch()
  const route = useRouter()

  const onClickHandler = () => {
    setIsModalOpen(true)
  }

  const onLogoutConfirm = async () => {
    try {
      await logout().unwrap()

      setIsModalOpen(false)
      route.push('/')

      if (onClick) {
        onClick()
      }
    } catch (error) {
      console.error('Ошибка выхода:', error)
    }
  }

  return (
    <>
      {href ? (
        <Button as={Link} className={s.item} href={href} variant={'transparent'}>
          <CurrentIcon className={clsx(s.icon, { [s.active]: isActive })} />
          <Typography
            as={'span'}
            className={clsx(s.itemTitle, { [s.active]: isActive })}
            option={'bold_text14'}
          >
            {title}
          </Typography>
        </Button>
      ) : (
        <Button className={s.item} onClick={onClickHandler} type={'button'} variant={'transparent'}>
          <CurrentIcon className={clsx(s.icon, { [s.active]: isActive })} />
          <Typography as={'span'} className={s.itemTitle} option={'bold_text14'}>
            {title}
          </Typography>
        </Button>
      )}
      <Dialog
        className={s.modal}
        modalTitle={'Log Out'}
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      >
        <div className={s.contentModal}>
          <Typography as={'span'} option={'regular_text16'}>
            {`Are you really want to log out of your account email?`}
          </Typography>
          <div className={s.modalActions}>
            <Button
              className={s.btnModal}
              disabled={isLoading}
              onClick={onLogoutConfirm}
              variant={'secondary'}
            >
              {'Yes'}
            </Button>
            <Button
              className={s.btnModal}
              onClick={() => setIsModalOpen(false)}
              variant={'primary'}
            >
              {'No'}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Alerts } from '@/src/components/alerts/Alerts'
import { Typography } from '@/src/components/typography/Typography'
import { selectAppError, setAppError, setIsLoggedIn } from '@/src/store/Slices/appSlice'
import { useLogoutMutation } from '@/src/store/services/authApi'
import { isLogoutApiError } from '@/src/utils/apiErrorHandlers'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import s from './itemWrapper.module.scss'

import { Button } from '../button/Button'

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

  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()
  const errorApi = useSelector(selectAppError)
  const route = useRouter()

  const onClickHandler = async () => {
    try {
      await logout().unwrap()
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      localStorage.removeItem('sn-token')
      route.push('/auth/login')
      if (onClick) {
        onClick()
      }
    } catch (err: unknown) {
      if (isLogoutApiError(err)) {
        const { error, statusCode: status } = err

        if (status === 401) {
          dispatch(setAppError({ error }))
        }
      }
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
      {errorApi && (
        <Alerts
          autoClose
          closeFn={() => {
            dispatch(setAppError({ error: null }))
          }}
          delay={3000}
          message={errorApi}
          type={'error'}
        />
      )}
    </>
  )
}

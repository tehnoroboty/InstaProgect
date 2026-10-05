'use client'

import { ComponentPropsWithoutRef } from 'react'

import GitHub from '@/src/shared/assets/componentsIcons/Github'
import { AuthRoutes } from '@/src/shared/lib/constants/routing'

import s from './gitHubOAuthButton.module.scss'

type Props = {
  className?: string
  setDisabledButton: (value: boolean) => void
} & ComponentPropsWithoutRef<'button'>

export const GitHubOAuthButton = (props: Props) => {
  const { className, setDisabledButton, ...rest } = props

  const login = () => {
    setDisabledButton(true)

    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${AuthRoutes.OAUTH_GITHUB}`

    window.location.assign(
      `${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login?redirect_url=${redirectUrl}`
    )
  }

  return (
    <button className={className} onClick={login} type={'button'} {...rest}>
      <GitHub className={s.gitHub} height={36} viewBox={'0 0 24 24'} width={36} />
    </button>
  )
}

'use client'

import { ComponentPropsWithoutRef } from 'react'

import GitHub from '@/src/shared/assets/componentsIcons/Github'

import s from './gitHubOAuthButton.module.scss'

type Props = {
  className?: string
  setDisabledButton: (value: boolean) => void
} & ComponentPropsWithoutRef<'button'>

export const GitHubOAuthButton = (props: Props) => {
  const { className, setDisabledButton, ...rest } = props

  const login = () => {
    setDisabledButton(true)
    window.location.assign(
      `https://inctagram.work/api/v1/auth/github/login?redirect_url=${process.env.NEXT_PUBLIC_BASE_URL as string}/auth/`
    )
  }

  return (
    <button className={className} onClick={login} type={'button'} {...rest}>
      <GitHub className={s.gitHub} height={36} viewBox={'0 0 24 24'} width={36} />
    </button>
  )
}

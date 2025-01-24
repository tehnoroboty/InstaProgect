'use client'

import { ComponentPropsWithoutRef } from 'react'

import GitHub from '@/src/assets/componentsIcons/Github'

import s from './gitHubOAuthButton.module.scss'

type Props = {
  className?: string
} & ComponentPropsWithoutRef<'button'>

export const GitHubOAuthButton = (props: Props) => {
  const { className } = props

  const login = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login')
  }

  return (
    <button className={className} onClick={login} type={'button'}>
      <GitHub className={s.gitHub} height={36} viewBox={'0 0 24 24'} width={36} />
    </button>
  )
}

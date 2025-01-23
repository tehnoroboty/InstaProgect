import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './oAuthButton.module.scss'

import { GitHubOAuthButton } from './githubOAuthButton/GitHubOAuthButton'
import { GoogleOAuthButton } from './googleOAuthButton/GoogleOAuthButton'

type Props = {
  className?: string
} & ComponentPropsWithoutRef<'div'>

export const OAuthButtons = (props: Props) => {
  const { className, ...rest } = props

  return (
    <div className={clsx(s.container, className)} {...rest}>
      <GoogleOAuthButton className={s.button} />

      <GitHubOAuthButton className={s.button} />
    </div>
  )
}

import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './oAuthButton.module.scss'

import { GitHubOAuthButton } from './githubOAuthButton/GitHubOAuthButton'
import { GoogleOAuthButton } from './googleOAuthButton/GoogleOAuthButton'

type Props = {
  className?: string
  disabled?: boolean
} & ComponentPropsWithoutRef<'div'>

export const OAuthButtons = (props: Props) => {
  const { className, disabled = false, ...rest } = props

  return (
    <div className={clsx(s.container, className)} {...rest}>
      <GoogleOAuthButton className={s.button} disabled={disabled} />

      <GitHubOAuthButton className={s.button} disabled={disabled} />
    </div>
  )
}

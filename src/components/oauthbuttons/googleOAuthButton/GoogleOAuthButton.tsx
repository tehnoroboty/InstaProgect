'use client'

import { ComponentPropsWithoutRef } from 'react'

import Google from '@/src/assets/componentsIcons/GoogleSvgrepoCom1'
import { getClientId } from '@/src/utils/googleClientId'

type Props = {
  className?: string
  disabled?: boolean
  disabledButton: boolean
  setDisabledButton: (value: boolean) => void
} & ComponentPropsWithoutRef<'button'>

export const GoogleOAuthButton = (props: Props) => {
  const { className, disabled, disabledButton, setDisabledButton, ...rest } = props

  // console.log('🚀GoogleOAuthButton', disabled)

  const login = () => {
    setDisabledButton(true)
    const clientId = getClientId()
    const REDIRECT_URL = (process.env.NEXT_PUBLIC_BASE_URL as string) + '/auth/google'
    const scope = 'email profile'
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=${scope}`

    window.location.assign(authUrl)
  }

  return (
    <button
      className={className}
      disabled={disabledButton || disabled}
      onClick={login}
      type={'button'}
      {...rest}
    >
      <Google height={36} viewBox={'0 0 24 24'} width={36} />
    </button>
  )
}

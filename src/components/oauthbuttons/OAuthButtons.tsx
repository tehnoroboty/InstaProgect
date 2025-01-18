import { ComponentPropsWithoutRef } from 'react'

import GitHub from '@/src/assets/componentsIcons/Github'
import Google from '@/src/assets/componentsIcons/GoogleSvgrepoCom1'
import clsx from 'clsx'

import s from './oAuthButton.module.scss'

type Props = {
  className?: string
} & ComponentPropsWithoutRef<'div'>

export const OAuthButtons = (props: Props) => {
  const { className, ...rest } = props

  return (
    <div className={clsx(s.container, className)} {...rest}>
      <button type={'button'}>
        <Google height={36} viewBox={'0 0 24 24'} width={36} />
      </button>
      <button type={'button'}>
        <GitHub className={s.gitHub} height={36} viewBox={'0 0 24 24'} width={36} />
      </button>
    </div>
  )
}

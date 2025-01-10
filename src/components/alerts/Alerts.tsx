import { ReactNode } from 'react'

import { Button } from '@/src/components/button/Button'
import { Typography } from '@/src/components/typography/Typography'

import s from './alerts.module.scss'

type Props = {
  className?: string
  closable?: boolean
  id?: string
  message?: ReactNode | string
  type?: 'error' | 'info' | 'success' | 'warning'
}

export const Alerts = ({ message, type = 'success', ...rest }: Props) => {
  let text = message

  if (!message) {
    text = type === 'error' ? 'Server is not available' : 'Your settings are saved'
  }

  return (
    <div className={s.alertsWrapper}>
      {type === 'error' && <Typography option={'bold_text16'}>Error</Typography>}
      <Typography option={'regular_text16'}>{text}</Typography>
      <Button className={s.close} variant={'transparent'}>
        <span></span>
        <span></span>
      </Button>
    </div>
  )
}

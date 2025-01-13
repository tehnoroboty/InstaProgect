import { createPortal } from 'react-dom'

import { Button } from '@/src/components/button/Button'
import { Typography } from '@/src/components/typography/Typography'

import s from './alerts.module.scss'

type Props = {
  className?: string
  closable?: boolean
  id?: string
  message?: string
  position?: 'fixed' | 'static'
  type?: 'error' | 'info' | 'success' | 'warning'
}

export const Alerts = ({
  className,
  message,
  position = 'fixed',
  type = 'success',
  ...rest
}: Props) => {
  let text = message

  if (!message) {
    text = type === 'error' ? 'Server is not available' : 'Your settings are saved'
  }

  const classNames = `${s.alertsWrapper} ${position === 'fixed' ? s.positionFixed : ''}  ${type === 'error' ? s.typeError : ''} ${type === 'success' ? s.typeSuccess : ''} ${className || ''}`

  const component = (
    <div className={classNames}>
      <div className={s.message}>
        {type === 'error' && (
          <Typography className={s.text} option={'bold_text16'}>
            Error!
          </Typography>
        )}
        <Typography className={s.text} option={'regular_text16'}>
          {text}
        </Typography>
      </div>
      <Button className={s.close} variant={'transparent'}>
        <span></span>
      </Button>
    </div>
  )

  if (position === 'fixed') {
    return createPortal(component, document.body)
  } else {
    return component
  }
}

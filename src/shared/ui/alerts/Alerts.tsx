'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from './alerts.module.scss'

type Props = {
  autoClose?: boolean
  className?: string
  closable?: boolean
  closeFn?: () => void
  delay?: number
  id?: string
  message?: string
  position?: 'fixed' | 'static'
  type?: 'error' | 'info' | 'success' | 'warning'
}

/**
 * Alerts component to display various types of alerts.
 *
 * @component
 *
 * @param {Object} props - Component properties.
 *
 * @param {number} [props.delay=5000] - Delay before automatically closing the alert.
 *
 * @param {boolean} [props.autoClose=false] - Whether the alert should close automatically after the delay.
 *
 * @param {string} [props.className] - Additional class names for the alert.
 *
 * @param {boolean} [props.closable=true] - Indicates if the alert can be closed by the user.
 *
 * @param {string} [props.message] - The message to be displayed in the alert.
 *
 * @param {'fixed' | 'static'} [props.position='fixed'] - Positioning of the alert, can be 'fixed' or 'static'.
 *
 * @param {'error' | 'info' | 'success' | 'warning'} [props.type='success'] - Type of the alert, affecting its styling.
 *
 *
 * @example
 * // Usage of Alerts component
 * <Alerts
 *   message="This is an informational message."
 *   type="info"
 *   autoClose={true}
 *   delay={3000}
 *   closable={true}
 * />
 */

export const Alerts = ({
  autoClose = false,
  className,
  closable = true,
  closeFn,
  delay = 5000,
  message,
  position = 'fixed',
  type = 'success',
  ...rest
}: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const alertRef = useRef<HTMLDivElement>(null)

  const closeAlerts = useCallback(() => {
    if (closeFn) {
      closeFn()
    }
    setIsOpen(false)
  }, [closeFn])

  useEffect(() => {
    if (autoClose) {
      const timeout = setTimeout(closeAlerts, delay)

      return () => clearTimeout(timeout)
    }
  }, [autoClose, closeAlerts, delay])

  useEffect(() => {
    if (position === 'fixed') {
      const handleClickOutside = (event: MouseEvent) => {
        if (alertRef.current && !alertRef.current.contains(event.target as Node)) {
          closeAlerts()
        }
      }

      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [closeAlerts, position])

  const text = message || (type === 'error' ? 'Server is not available' : 'Your settings are saved')

  const classNames = clsx(
    s.alertsWrapper,
    position === 'fixed' && s.positionFixed,
    position === 'static' && s.positionStatic,
    s[`type${type.charAt(0).toUpperCase() + type.slice(1)}`],
    className || ''
  )

  const component = isOpen && (
    <div aria-live={'polite'} className={classNames} ref={alertRef} {...rest}>
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
      {closable && (
        <Button className={s.close} onClick={closeAlerts} variant={'transparent'}></Button>
      )}
    </div>
  )

  if (position === 'fixed') {
    return createPortal(component, document.body)
  } else {
    return component
  }
}

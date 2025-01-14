// @flow
'use client'
import * as React from 'react'
import { useState } from 'react'

import Recaptchalogo from '@/src/assets/componentsIcons/Recaptchalogo'
import { Typography } from '@/src/components/typography/Typography'
import clsx from 'clsx'


import s from './recaptcha.module.scss'

type RecaptchaType = 'error' | 'loading' | 'unchecked' | 'verified'
type ErrorType = 'expired' | 'notVerified' | null

export const Recaptcha = () => {
  const [status, setStatus] = useState<RecaptchaType>('error')
  const [errorType, setErrorType] = useState<ErrorType>(null)

  const onChangeHendler = () => {
    setStatus('loading')
    setTimeout(() => setStatus('verified'), 2000)
  }

  const renderStatus = () => {
    switch (status) {
      case 'unchecked':
      case 'error':
        return (
          <input
            className={s.input}
            id={'recaptcha'}
            onChange={onChangeHendler}
            type={'checkbox'}
          />
        )
      case 'loading':
        return (
          <div className={s.loadingContainer}>
            <div className={s.loaderCircle}></div>
          </div>
        )
      case 'verified':
        return <div className={s.greenCheck}></div>
      default:
        return null
    }
  }

  return (
    <div className={clsx({ [s.error]: status === 'error' })}>
      <div className={s.container}>
        <div className={s.checkbox}>
          {status === 'error' && errorType === 'expired' && (
            <div className={s.errorTextBox}>
              <Typography as={'span'} className={s.textError} option={'small_text'}>
                Verifiction expired. Check the checkbox again.
              </Typography>
            </div>
          )}
          {renderStatus()}
          <Typography
            as={'label'}
            className={s.label}
            htmlFor={'recaptcha'}
            option={'semi-bold_small_text'}
          >
            I’m not a robot
          </Typography>
        </div>
        <Recaptchalogo height={60} viewBox={'-2 0 24 24'} width={60} />
      </div>
      {status === 'error' && errorType === 'notVerified' && (
        <Typography as={'span'} className={s.textError} option={'small_text'}>
          Please verify that you are not a robot
        </Typography>
      )}
    </div>
  )
}

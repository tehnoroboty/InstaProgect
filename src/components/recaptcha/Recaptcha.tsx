// @flow
'use client'
import * as React from 'react'
import { useState } from 'react'

import Recaptchalogo from '@/src/assets/componentsIcons/Recaptchalogo'

import s from './recaptcha.module.scss'

type RecaptchaType = 'error' | 'loading' | 'unchecked' | 'verified'

export const Recaptcha = () => {
  const [status, setStatus] = useState<RecaptchaType>('unchecked')

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
    <div className={`${status === 'error' ? s.error : ''}`}>
      <div className={s.container}>
        <div className={s.checkbox}>
          {renderStatus()}
          <label className={s.label} htmlFor={'recaptcha'}>
            I’m not a robot
          </label>
        </div>
        <Recaptchalogo height={60} viewBox={'-2 0 24 24'} width={60} />
      </div>
      {status === 'error' ? (
        <span className={s.textError}>Please verify that you are not a robot</span>
      ) : null}
    </div>
  )
}

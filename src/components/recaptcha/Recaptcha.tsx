// @flow
'use client'
import * as React from 'react'
import s from './recaptcha.module.scss'
import Recaptchalogo from '@/src/assets/componentsIcons/Recaptchalogo'
import { useState } from 'react'

export const Recaptcha = () => {
  const [status, setStatus] = useState<'unchecked' | 'loading' | 'verified' | 'error'>('unchecked')

  const onChangeHendler = () => {
    setStatus('loading')
    setTimeout(() => setStatus('verified'), 2000)
  }

  const renderStatus = () => {
    switch (status) {
      case 'unchecked':
      case 'error':
        return (
          <input id={'recaptcha'} onChange={onChangeHendler} className={s.input} type="checkbox" />
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
          <label htmlFor={'recaptcha'} className={s.label}>
            I’m not a robot
          </label>
        </div>
        <Recaptchalogo width={60} height={60} viewBox={'-2 0 24 24'} />
      </div>
      {status === 'error' ? (
        <span className={s.textError}>Please verify that you are not a robot</span>
      ) : null}
    </div>
  )
}

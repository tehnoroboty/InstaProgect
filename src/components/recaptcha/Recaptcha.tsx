// @flow
'use client'
import * as React from 'react'
import { useRef, useState } from 'react'
/* eslint-disable import/no-named-as-default */
import ReCAPTCHA from 'react-google-recaptcha'

import { Typography } from '@/src/components/typography/Typography'
import { getSiteKey } from '@/src/utils/recaptchaGetKey'
import clsx from 'clsx'

import s from './recaptcha.module.scss'

type Props = {
  onChangeValue: (value: null | string) => void
}

export const Recaptcha = ({ onChangeValue }: Props) => {
  const [error, setError] = useState<null | string>(null)
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const siteKey = getSiteKey()

  const onChangeHandler = (value: null | string) => {
    if (!value) {
      setError('Please verify that you are not a robot')
    } else {
      setError(null)
    }
    onChangeValue(value)
  }

  return (
    <div className={clsx(s.recaptchaWrapper, { [s.error]: error })}>
      <ReCAPTCHA
        hl={'en'}
        onChange={onChangeHandler}
        ref={recaptchaRef}
        sitekey={siteKey}
        theme={'dark'}
      />
      {error && (
        <Typography as={'span'} className={s.textError} option={'small_text'}>
          {error}
        </Typography>
      )}
    </div>
  )
}

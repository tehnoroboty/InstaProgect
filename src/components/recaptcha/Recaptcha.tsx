// @flow
'use client'
import * as React from 'react'
import s from './recaptcha.module.scss'
import Recaptchalogo from '@/src/assets/componentsIcons/Recaptchalogo'
import { useState } from 'react'

export const Recaptcha = ({ isVarifed }: Props) => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <div className={s.container}>
      <div className={s.checkbox}>
        <input id={'recaptcha'} className={s.input} type="checkbox" />
        <label htmlFor={'recaptcha'} className={s.label}>
          I’m not a robot
        </label>
      </div>
      <Recaptchalogo width={60} height={60} viewBox={'-2 0 24 24'} />
    </div>
  )
}

import React from 'react'

import { Button } from '@/src/components/button/Button'
import { Card } from '@/src/components/card/Card'
import { Input } from '@/src/components/input'
import { Typography } from '@/src/components/typography/Typography'

import s from './page.module.scss'

export default function LoginPage() {
  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <Typography className={s.title} option={'h1'}>
          Sign In
        </Typography>
        <div className={s.boxButtons}>
          <div>Google</div>
          <div>Github</div>
        </div>
        <div className={s.boxInputs}>
          <Input className={s.input} label={'Email'} placeholder={'Epam@epam.com'} />
          <Input
            className={s.input}
            label={'Password'}
            placeholder={'**********'}
            type={'password'}
          />
        </div>
        <div className={s.boxLinks}>
          <Button as={'a'} className={s.forgotPassword} href={'#'} variant={'transparent'}>
            Forgot Password
          </Button>
          <Button className={s.singIn} fullWidth variant={'primary'}>
            Sing in
          </Button>
          <Typography className={s.text} option={'regular_text16'}>
            Don’t have an account?
          </Typography>
          <Button className={s.singUp} variant={'transparent'}>
            {'Sing up'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

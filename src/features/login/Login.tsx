'use client'

import React from 'react'

import { Button } from '@/src/components/button/Button'
import { Card } from '@/src/components/card/Card'
import { Input } from '@/src/components/input'
import { OAuthButtons } from '@/src/components/oauthbuttons/OAuthButtons'
import { Typography } from '@/src/components/typography/Typography'
import { useLogin } from '@/src/features/login/hooks/useLogin'
import Link from 'next/link'

import s from './login.module.scss'

export default function Login() {
  const { disabledButton, errorObj, errors, handleSubmit, onSubmit, register } = useLogin()

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <Typography className={s.title} option={'h1'}>
          {'Sign In'}
          <br />
          e-mail: tehnoroboty@gmail.com
          <br />
          pass: qwQW12!
        </Typography>
        <OAuthButtons className={s.boxButtons} />
        <form className={s.boxInputs} onSubmit={handleSubmit(onSubmit)}>
          <Input
            className={s.input}
            label={'Email'}
            placeholder={'Epam@epam.com'}
            {...register('email')}
            error={errors.email && errors.email.message}
          />
          <Input
            className={s.input}
            label={'Password'}
            placeholder={'**********'}
            type={'password'}
            {...register('password')}
            error={
              (errorObj?.statusCode === 400 ? errorObj.messages : '') ||
              (errors.password && errors.password.message)
            }
          />
          <div className={s.forgotPassword}>
            <Link className={s.link} href={'/auth/forgot-password'}>
              <Typography className={s.linkText} option={'regular_text14'}>
                {'Forgot Password'}
              </Typography>
            </Link>
          </div>
          <Button
            className={s.singIn}
            disabled={disabledButton}
            fullWidth
            type={'submit'}
            variant={'primary'}
          >
            {'Sign in'}
          </Button>
        </form>
        <div className={s.boxLinks}>
          <Typography className={s.text} option={'regular_text16'}>
            {'Don’t have an account?'}
          </Typography>
          <Button
            as={Link}
            className={s.singUp}
            fullWidth
            href={'/auth/registration'}
            variant={'transparent'}
          >
            {'Sign up'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

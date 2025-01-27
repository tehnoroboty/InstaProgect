'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/src/components/button/Button'
import { Card } from '@/src/components/card/Card'
import { Input } from '@/src/components/input'
import { Typography } from '@/src/components/typography/Typography'

import s from './page.module.scss'

type FormValues = {
  email: string
  password: string
}

export default function LoginPage() {
  const { handleSubmit, register } = useForm<FormValues>()

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

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
        <form onSubmit={onSubmit}>
          <Input className={s.input} label={'Email'} {...register('email')} />
          <Input
            className={s.input}
            label={'Password'}
            placeholder={'**********'}
            type={'password'}
            {...register('password')}
          />
          <Button as={'a'} className={s.forgotPassword} href={'#'} variant={'transparent'}>
            Forgot Password
          </Button>
          <Button className={s.singIn} fullWidth type={'submit'} variant={'primary'}>
            Sing in
          </Button>
        </form>
        {/*<div className={s.boxInputs}>*/}
        {/*  <Input className={s.input} label={'Email'} placeholder={'Epam@epam.com'} />*/}
        {/*  <Input*/}
        {/*    className={s.input}*/}
        {/*    label={'Password'}*/}
        {/*    placeholder={'**********'}*/}
        {/*    type={'password'}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className={s.boxLinks}>
          {/*<Button as={'a'} className={s.forgotPassword} href={'#'} variant={'transparent'}>*/}
          {/*  Forgot Password*/}
          {/*</Button>*/}
          {/*<Button className={s.singIn} fullWidth variant={'primary'}>*/}
          {/*  Sing in*/}
          {/*</Button>*/}
          {/*<Typography className={s.text} option={'regular_text16'}>*/}
          {/*  Don’t have an account?*/}
          {/*</Typography>*/}
          {/*<Button className={s.singUp} variant={'transparent'}>*/}
          {/*  {'Sing up'}*/}
          {/*</Button>*/}
        </div>
      </Card>
    </div>
  )
}

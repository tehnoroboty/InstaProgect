'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { Alerts } from '@/src/components/alerts/Alerts'
import { Button } from '@/src/components/button/Button'
import { Card } from '@/src/components/card/Card'
import { Input } from '@/src/components/input'
import { OAuthButtons } from '@/src/components/oauthbuttons/OAuthButtons'
import { Typography } from '@/src/components/typography/Typography'
import { setIsLoggedIn } from '@/src/store/Slices/appSlice'
import { useLoginMutation } from '@/src/store/services/authApi'
import { AppDispatch } from '@/src/store/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import s from './page.module.scss'

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .trim()
    .regex(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'The email must match the format example@example.com'
    )
    .nonempty('Enter email'),
  password: z
    .string()
    .min(6, 'Min 6 characters long')
    .max(20, 'Max 20 characters long')
    .trim()
    .regex(
      new RegExp(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/
      ),
      'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character.'
    )
    .nonempty('Enter password'),
})

export type FormValues = z.infer<typeof LoginSchema>

export default function LoginPage() {
  const [login] = useLoginMutation()
  const [error, setError] = useState<null | string>(null)
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
    login(data)
      .unwrap()
      .then(res => {
        console.log('then', res)

        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        localStorage.setItem('sn-token', res.accessToken)
        router.push('/home')
      })
      .catch((e: any) => {
        const err = e

        console.log(err)
        // setError(err)
      })
  })

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <Typography className={s.title} option={'h1'}>
          Sign In
          <br />
          e-mail: tehnoroboty@gmail.com
          <br />
          pass: qwQW12!
        </Typography>
        <OAuthButtons className={s.boxButtons} />
        <form className={s.boxInputs} onSubmit={onSubmit}>
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
            error={errors.password && errors.password.message}
          />
          <Button as={'a'} className={s.forgotPassword} href={'#'} variant={'transparent'}>
            Forgot Password
          </Button>
          <Button className={s.singIn} fullWidth type={'submit'} variant={'primary'}>
            Sing in
          </Button>
        </form>
        <div className={s.boxLinks}>
          <Typography className={s.text} option={'regular_text16'}>
            Don’t have an account?
          </Typography>
          <Button className={s.singUp} variant={'transparent'}>
            {'Sing up'}
          </Button>
        </div>
      </Card>
      {error && <Alerts autoClose delay={3000} message={error} type={'error'} />}
    </div>
  )
}

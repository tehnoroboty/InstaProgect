'use client'

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@/src/components/button/Button'
import { Card } from '@/src/components/card/Card'
import { Input } from '@/src/components/input'
import { OAuthButtons } from '@/src/components/oauthbuttons/OAuthButtons'
import { Typography } from '@/src/components/typography/Typography'
import { selectAppError, setAppError, setIsLoggedIn } from '@/src/store/Slices/appSlice'
import { useLoginMutation } from '@/src/store/services/authApi'
import { LoginError } from '@/src/store/services/types'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import s from './Signin.module.scss'

import { FormType, LoginSchema } from './validators'

export default function Signin() {
  const errorApi = useSelector(selectAppError)

  const [login, { isLoading }] = useLoginMutation()

  const [errorObj, setErrorObj] = useState<LoginError | null>(null)
  const router = useRouter()
  const dispatch = useDispatch()

  const isApiError = (error: unknown): error is { data: { messages: string }; status: number } => {
    return typeof error === 'object' && error != null && 'status' in error
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  })

  const email = watch('email')
  const password = watch('password')

  useEffect(() => {
    if (errorApi) {
      dispatch(setAppError({ error: null }))
    }
    if (errorObj) {
      setErrorObj(null)
    }
  }, [email, password, dispatch])

  const disabledButton = !email || !password || Object.keys(errors).length > 0

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      const res = await login(formData).unwrap()

      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      localStorage.setItem('sn-token', res.accessToken)
      router.push('/home')
    } catch (err) {
      if (isApiError(err)) {
        const { data, status } = err

        if (status === 400) {
          setErrorObj(data)
          dispatch(setAppError({ error: data.messages }))
        }
      }
    }
    console.error('Registration failed:', errors.root)
  }

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
            disabled={disabledButton || isLoading}
            fullWidth
            type={'submit'}
            variant={'primary'}
          >
            {'Sing in'}
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
            {'Sing up'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

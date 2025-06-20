'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormType, schema } from '@/src/features/login/validators'
import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { useLoginMutation } from '@/src/shared/model/api/authApi'
import { LoginError } from '@/src/shared/model/api/types'
import { Button } from '@/src/shared/ui/button/Button'
import { Card } from '@/src/shared/ui/card/Card'
import { Input } from '@/src/shared/ui/input'
import { OAuthButtons } from '@/src/shared/ui/oauthbuttons/OAuthButtons'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import s from './login.module.scss'

export default function Login() {
  const [login, { isLoading }] = useLoginMutation()

  const router = useRouter()

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<FormType>({
    defaultValues: {
      email: 'tehnoroboty@gmail.com',
      password: 'qwQW12!',
    },
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })
  const disabledButton = isLoading || !isValid || Object.keys(errors).length > 0

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      await login(formData).unwrap()

      router.push(AuthRoutes.HOME)
    } catch (err) {
      const { data } = err as LoginError

      setError('password', { message: data.messages, type: 'manual' })
    }
  }

  return (
    <>
      <Card className={s.card}>
        <Typography className={s.title} option={'h1'}>
          {'Sign In'}
          <br />
          e-mail: tehnoroboty@gmail.com
          <br />
          pass: qwQW12!
        </Typography>
        <OAuthButtons className={s.boxButtons} disabled={isLoading} />
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
            error={errors.password && errors.password.message}
          />
          <div className={s.forgotPassword}>
            <Link className={s.link} href={'/auth/forgot-password'}>
              <Typography className={s.linkText} option={'regular_text14'}>
                {'Forgot Password'}
              </Typography>
            </Link>
          </div>
          <Button
            className={s.signIn}
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
            className={s.signUp}
            fullWidth
            href={'/auth/registration'}
            variant={'transparent'}
          >
            {'Sign up'}
          </Button>
        </div>
      </Card>
    </>
  )
}

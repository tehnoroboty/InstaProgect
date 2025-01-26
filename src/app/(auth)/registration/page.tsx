'use client'

import { ChangeEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/src/components/button/Button'
import { Card } from '@/src/components/card/Card'
import { CheckBox } from '@/src/components/checkbox/CheckBox'
import { Input } from '@/src/components/input/Input'
import { Typography } from '@/src/components/typography/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { z } from 'zod'

import s from './registration.module.scss'

const schema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address')
      .regex(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        'The email must match the format example@example.com'
      ),
    password: z
      .string()
      .min(6, 'Min 6 characters long')
      .max(20, 'Max 20 characters long')
      .regex(
        new RegExp(
          /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/
        ),
        'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character.'
      )
      .nonempty('Enter password'),
    passwordConfirmation: z.string().nonempty('Confirm your password'),
    username: z
      .string()
      .min(6, 'Min 6 characters long')
      .max(30, 'Max characters long')
      .nonempty('Enter username')
      .regex(/^[A-Za-z0-9_-]+$/, 'Invalid username'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

type FormType = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    trigger,
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      username: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormType> = data => {}

  return (
    <div className={s.container}>
      <Card className={s.card}>
        <Typography as={'h1'} option={'h1'}>
          {'Sign Up'}
        </Typography>
        <form className={s.contentForm} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={'Username'}
            placeholder={'Username'}
            type={'text'}
            {...register('username', {
              onBlur: () => trigger('username'),
            })}
            error={errors.username && errors.username.message}
          />
          <Input
            label={'Email'}
            placeholder={'Email'}
            type={'email'}
            {...register('email', {
              onBlur: () => trigger('email'),
            })}
            error={errors.email && errors.email.message}
          />
          <Input
            label={'Password'}
            placeholder={'сreate new password...'}
            type={'password'}
            {...register('password', {
              onBlur: () => trigger('password'),
            })}
            error={errors.password && errors.password.message}
          />
          <Input
            label={'Password confirmation'}
            placeholder={'confirm your password...'}
            type={'password'}
            {...register('passwordConfirmation', {
              onBlur: () => trigger('passwordConfirmation'),
            })}
            error={errors.passwordConfirmation && errors.passwordConfirmation.message}
          />
          <CheckBox
            label={
              <>
                {'I agree to the '}
                <Link className={s.link} href={'/terms-of-service'}>
                  {' Terms  of  Service '}
                </Link>
                {' and '}
                <Link className={s.link} href={'/privacy-policy'}>
                  {' Privacy Policy '}
                </Link>
              </>
            }
            labelProps={{ className: s.label }}
          />
          <Button fullWidth variant={'primary'}>
            {'Sing Up'}
          </Button>
        </form>
        <div className={s.content}>
          <Typography as={'span'} className={s.text} option={'regular_text16'}>
            {'Do you have an account?'}
          </Typography>
          <Button as={Link} fullWidth href={'/login'} variant={'transparent'}>
            {'Sing In'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

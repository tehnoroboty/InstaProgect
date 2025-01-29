'use client'

import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/src/components/button/Button'
import { Card } from '@/src/components/card/Card'
import { CheckBox } from '@/src/components/checkbox/CheckBox'
import { Input } from '@/src/components/input/Input'
import { OAuthButtons } from '@/src/components/oauthbuttons/OAuthButtons'
import { Typography } from '@/src/components/typography/Typography'
import { useRegistrationMutation } from '@/src/store/services/authApi'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { z } from 'zod'

import s from './registration.module.scss'

const schema = z
  .object({
    checkbox: z.boolean(),
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

export default function RegistrationPage() {
  const ref = useRef<HTMLInputElement>(null)
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
    watch,
  } = useForm<FormType>({
    defaultValues: {
      checkbox: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      username: '',
    },
    resolver: zodResolver(schema),
  })

  const onChangeHandler = () => {
    if (ref.current) {
      const value = ref.current.checked

      setValue('checkbox', value)
    }
  }

  const disabledButton =
    !watch('email') ||
    !watch('username') ||
    !watch('password') ||
    !watch('passwordConfirmation') ||
    !watch('checkbox') ||
    Object.keys(errors).length > 0

  const [registration, { error, isLoading, isSuccess }] = useRegistrationMutation()
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      // Формируем данные для отправки, исключая ненужные поля
      const registrationData = {
        baseUrl: 'http://localhost:3000',
        email: formData.email,
        password: formData.password,
        userName: formData.username,
      }

      // Отправляем запрос на сервер
      await registration(registrationData).unwrap()

      // Очищаем форму
      reset()

      // Сохраняем email перед отправкой
      setSubmittedEmail(formData.email)

      setShowSuccessMessage(true)
    } catch (err) {
      console.error('Registration failed:', err)
    }
  }

  // Функция для закрытия сообщения
  const handleCloseMessage = () => {
    setShowSuccessMessage(false)
  }

  return (
    <div className={s.container}>
      {showSuccessMessage ? (
        <Card className={s.card}>
          <Typography as={'h1'} option={'h1'}>
            {'Email sent'}
          </Typography>
          <Typography option={'regular_text16'}>
            We have sent a link to confirm your email to {submittedEmail}
          </Typography>
          <Button onClick={handleCloseMessage} variant={'primary'}>
            OK
          </Button>
        </Card>
      ) : (
        <Card className={s.card}>
          <Typography as={'h1'} option={'h1'}>
            {'Sign Up'}
          </Typography>
          <OAuthButtons className={s.oauthBtns} />
          <form className={s.contentForm} onSubmit={handleSubmit(onSubmit)}>
            <Input
              className={s.input}
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
              onChange={onChangeHandler}
              ref={ref}
            />
            <Button disabled={disabledButton} fullWidth variant={'primary'}>
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
      )}
    </div>
  )
}

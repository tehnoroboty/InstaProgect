'use client'
import { ChangeEvent, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/src/components/button/Button'
import { Card } from '@/src/components/card/Card'
import { Dialog } from '@/src/components/dialog/Dialog'
import { Input } from '@/src/components/input/Input'
import { Recaptcha } from '@/src/components/recaptcha/Recaptcha'
import { Typography } from '@/src/components/typography/Typography'
import { usePasswordRecoveryMutation } from '@/src/store/services/authApi'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

const schema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .regex(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'The email must match the format example@example.com'
    ),
  recaptcha: z.string().min(1, 'Please verify that you are not a robot'),
})

type FormType = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [passwordRecovery] = usePasswordRecoveryMutation()
  const [recaptchaError, setRecaptchaError] = useState<null | string>(null)
  const [serverError, setServerError] = useState<null | string>(null)
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)
  const {
    clearErrors,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
    watch,
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      recaptcha: '',
    },
    resolver: zodResolver(schema),
  })

  const onChangeToken = (value: null | string) => {
    if (value === null) {
      setRecaptchaError('Please verify that you are not a robot')
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
    } else {
      setValue('recaptcha', value)
      setRecaptchaError(null)
    }
  }
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setValue('email', value)
    if (value) {
      clearErrors('email')
      setServerError(null)
    }
  }

  const onSubmit: SubmitHandler<FormType> = data => {
    passwordRecovery({
      baseUrl: 'http://localhost:3000',
      email: data.email,
      recaptcha: data.recaptcha,
    })
      .unwrap()
      .then(() => {
        setIsModalOpen(true)
        setServerError(null)
        clearErrors(['email', 'recaptcha'])
        setFormSubmit(true)
      })
      .catch(error => {
        const typedError = error as { data: { messages: { field: string; message: string }[] } }

        if (typedError?.data?.messages && typedError.data.messages[0]?.message) {
          setServerError(typedError.data.messages[0].message)
        } else {
          setServerError("User with this email doesn't exist")
        }
      })
  }

  const handleResendLink = () => {
    reset()
    setFormSubmit(false)
  }

  const isButtonDisabled = !watch('email') || !watch('recaptcha') || recaptchaError !== null

  return (
    <div className={s.container}>
      <Card className={s.card}>
        <Typography as={'h1'} option={'h1'}>
          {'Forgot Password'}
        </Typography>
        <form className={s.content} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={'Email'}
            placeholder={'Email'}
            type={'email'}
            {...register('email', {
              onBlur: () => trigger('email'),
            })}
            error={(serverError && serverError) || (errors.email && errors.email.message)}
            onChange={onChangeEmail}
          />
          <Typography as={'span'} className={s.text}>
            {'Enter your email address and we will send you further instructions'}
          </Typography>
          {!formSubmit ? (
            <Button disabled={isButtonDisabled} fullWidth variant={'primary'}>
              {'Send Link'}
            </Button>
          ) : (
            <div className={s.alternativeContent}>
              <Typography as={'span'}>
                {'The link has been sent by email.If you don’t receive an email send link again'}
              </Typography>
              <Button fullWidth onClick={handleResendLink} variant={'primary'}>
                {'Send Link Again'}
              </Button>
            </div>
          )}
        </form>
        <Button as={Link} className={s.link} fullWidth href={'/login'} variant={'transparent'}>
          {'Back to Sing In'}
        </Button>
        {!formSubmit && (
          <Recaptcha
            className={s.recaptcha}
            isError={recaptchaError}
            onChangeValue={onChangeToken}
            ref={recaptchaRef}
          />
        )}
      </Card>
      <Dialog
        className={s.modal}
        modalTitle={'Email sent'}
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      >
        <div className={s.contentModal}>
          <Typography
            as={'span'}
            option={'regular_text16'}
          >{`We have sent a link to confirm your email to ${getValues('email')}`}</Typography>
          <Button className={s.btnModal} onClick={() => setIsModalOpen(false)} variant={'primary'}>
            {'OK'}
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

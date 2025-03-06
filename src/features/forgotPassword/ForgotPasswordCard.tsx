'use client'
import { ChangeEvent, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormType, schema } from '@/src/features/forgotPassword/validators'
import { usePasswordRecoveryMutation } from '@/src/shared/model/api/authApi'
import { CustomerError } from '@/src/shared/model/api/types'
import { Button } from '@/src/shared/ui/button/Button'
import { Card } from '@/src/shared/ui/card/Card'
import { Dialog } from '@/src/shared/ui/dialog/Dialog'
import { Input } from '@/src/shared/ui/input/Input'
import { Recaptcha } from '@/src/shared/ui/recaptcha/Recaptcha'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import s from './forgotPassword.module.scss'

export default function ForgotPasswordCard() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [passwordRecovery, { isLoading }] = usePasswordRecoveryMutation()
  const [recaptchaError, setRecaptchaError] = useState<null | string>(null)
  const [serverError, setServerError] = useState<null | string>(null)
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)
  const {
    clearErrors,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      recaptcha: '',
    },
    mode: 'onChange',
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

  const onSubmit: SubmitHandler<FormType> = async data => {
    try {
      await passwordRecovery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
        email: data.email,
        recaptcha: data.recaptcha,
      }).unwrap()

      setIsModalOpen(true)
      setServerError(null)
      clearErrors(['email', 'recaptcha'])
      setFormSubmit(true)
    } catch (error) {
      const typedError = error as CustomerError

      if (typedError?.data?.messages && typedError.data.messages[0]?.message) {
        setServerError(typedError.data.messages[0].message)
      } else {
        setServerError("User with this email doesn't exist")
      }
    }
  }

  const handleResendLink = () => {
    reset()
    setFormSubmit(false)
  }

  const isButtonDisabled = !isValid || recaptchaError !== null || isLoading

  return (
    <>
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
                {'The link has been sent by email. If you don’t receive an' +
                  ' email send link again'}
              </Typography>
              <Button fullWidth onClick={handleResendLink} variant={'primary'}>
                {'Send Link Again'}
              </Button>
            </div>
          )}
        </form>
        <Button as={Link} className={s.link} fullWidth href={'/auth/login'} variant={'transparent'}>
          {'Back to Sign In'}
        </Button>
        {!formSubmit && (
          <Recaptcha
            className={s.recaptcha}
            isError={recaptchaError}
            onChangeValue={value => {
              onChangeToken(value)
              trigger('recaptcha')
            }}
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
    </>
  )
}

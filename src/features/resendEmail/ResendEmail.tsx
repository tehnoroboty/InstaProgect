'use client'
import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormType, schema } from '@/src/features/resendEmail/validators'
import { useRegistrationEmailResendingMutation } from '@/src/shared/model/api/authApi'
import { CustomerError } from '@/src/shared/model/api/types'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { Input } from '@/src/shared/ui/input/Input'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

import s from './resendEmail.module.scss'

export const ResendEmail = () => {
  const {
    clearErrors,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    trigger,
    watch,
  } = useForm<FormType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  })

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setValue('email', value)
    if (value) {
      clearErrors('email')
    }
  }
  const [registrationEmailResending, { isLoading }] = useRegistrationEmailResendingMutation()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      const registrationEmailResendingData = {
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
        email: formData.email,
      }

      await registrationEmailResending(registrationEmailResendingData).unwrap()

      setShowSuccessMessage(true)
    } catch (err) {
      const error = err as CustomerError
      const errorMessage = error.data?.messages[0]

      if (errorMessage?.field === 'email') {
        setError('email', { message: errorMessage.message, type: 'manual' })
      }
    }
  }

  const handleCloseMessage = () => {
    setShowSuccessMessage(false)
    reset()
  }

  return (
    <div className={s.container}>
      <Dialog
        className={s.modalEmailSent}
        modalTitle={'Email sent'}
        onClose={handleCloseMessage}
        open={showSuccessMessage}
      >
        <div className={s.modalContent}>
          <Typography as={'p'} className={s.modalText} option={'regular_text16'}>
            {`We have sent a link to confirm your email to ${getValues('email')}`}
          </Typography>
          <Button className={s.modalButton} onClick={handleCloseMessage} variant={'primary'}>
            {'OK'}
          </Button>
        </div>
      </Dialog>

      <Typography as={'h1'} option={'h1'}>
        {'Email verification link expired'}
      </Typography>
      <Typography as={'span'} option={'regular_text14'}>
        {'Looks like the verification link has expired. Not to worry, we can send the link again'}
      </Typography>
      <form className={s.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={s.input}
          label={'Email'}
          placeholder={'email@example.com'}
          {...register('email', { onBlur: () => trigger('email'), onChange: onChangeHandler })}
          error={errors.email && errors.email.message}
        />
        <Button disabled={!isValid || isLoading} variant={'primary'}>
          {'Resend verification link'}
        </Button>
      </form>
      <Image alt={''} height={320} src={'/image/rafiki.svg'} width={430} />
    </div>
  )
}

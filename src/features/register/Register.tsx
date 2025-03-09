'use client'

import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormType, schema } from '@/src/features/register/validators'
import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { useRegistrationMutation } from '@/src/shared/model/api/authApi'
import { CustomerError } from '@/src/shared/model/api/types'
import { Button } from '@/src/shared/ui/button/Button'
import { Card } from '@/src/shared/ui/card/Card'
import { CheckBox } from '@/src/shared/ui/checkbox/CheckBox'
import { Dialog } from '@/src/shared/ui/dialog'
import { Input } from '@/src/shared/ui/input'
import { OAuthButtons } from '@/src/shared/ui/oauthbuttons/OAuthButtons'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import s from '@/src/features/register/register.module.scss'

export const Register = () => {
  const ref = useRef<HTMLInputElement>(null)
  const {
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    trigger,
  } = useForm<FormType>({
    defaultValues: {
      checkbox: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      userName: '',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
  })

  const onChangeHandler = () => {
    if (ref.current) {
      const value = ref.current.checked

      setValue('checkbox', value)
    }
  }

  const [registration, { isLoading }] = useRegistrationMutation()
  const disabledButton = !isValid || Object.keys(errors).length > 0 || isLoading
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      const registrationData = {
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
        email: formData.email,
        password: formData.password,
        userName: formData.userName,
      }

      await registration(registrationData).unwrap()

      setShowSuccessMessage(true)
    } catch (err) {
      const error = err as CustomerError
      const errorMessage = error.data?.messages[0]

      if (errorMessage?.field === 'userName') {
        setError('userName', { message: errorMessage.message, type: 'manual' })
      }
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
    <>
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
            {...register('userName', {
              onBlur: () => trigger('userName'),
            })}
            error={errors.userName?.message}
          />
          <Input
            label={'Email'}
            placeholder={'Email'}
            type={'email'}
            {...register('email', {
              onBlur: () => trigger('email'),
            })}
            error={errors.email?.message}
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
            className={s.checkbox}
            label={
              <>
                {'I agree to the '}
                <Link className={s.link} href={'/auth/terms-of-service'}>
                  {' Terms  of  Service '}
                </Link>
                {' and '}
                <Link className={s.link} href={'/auth/privacy-policy'}>
                  {' Privacy Policy '}
                </Link>
              </>
            }
            labelProps={{ className: s.label }}
            onChange={onChangeHandler}
            ref={ref}
          />
          <Button disabled={disabledButton} fullWidth variant={'primary'}>
            {'Sign Up'}
          </Button>
        </form>
        <div className={s.content}>
          <Typography as={'span'} className={s.text} option={'regular_text16'}>
            {'Do you have an account?'}
          </Typography>
          <Button as={Link} fullWidth href={AuthRoutes.LOGIN} variant={'transparent'}>
            {'Sign In'}
          </Button>
        </div>
      </Card>
    </>
  )
}

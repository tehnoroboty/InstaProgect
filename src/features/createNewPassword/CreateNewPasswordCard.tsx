'use client'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/src/components/button/Button'
import { Card } from '@/src/components/card/Card'
import { Input } from '@/src/components/input/Input'
import { Typography } from '@/src/components/typography/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z
  .object({
    newPassword: z
      .string()
      .nonempty('Enter password')
      .min(6, 'Min 6 characters long')
      .max(20, 'Max 20 characters long')
      .regex(
        new RegExp(
          /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/
        ),
        'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character.'
      ),
    passwordConfirmation: z.string().nonempty('Confirm your password'),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

type FormType = z.infer<typeof schema>

import { ChangeEvent, useEffect, useState } from 'react'

import { Dialog } from '@/src/components/dialog/Dialog'
import { setAppError } from '@/src/store/Slices/appSlice'
import { useCreateNewPasswordMutation, useRecoveryCodeMutation } from '@/src/store/services/authApi'
import { CustomerError } from '@/src/store/services/types'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './createNewPasswordPage.module.scss'

export default function CreateNewPasswordCard() {
  const [createNewPassword, { error, isError, isLoading, isSuccess }] =
    useCreateNewPasswordMutation()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
  const err = error as CustomerError
  const router = useRouter()
  const searchParams = useSearchParams()
  const [recoveryCode] = useRecoveryCodeMutation()
  const code = searchParams.get('code') as string

  useEffect(() => {
    const confirmCode = async () => {
      try {
        await recoveryCode({ recoveryCode: code }).unwrap()
      } catch (err) {
        const error = err as CustomerError
        const errorMessage = error.data?.messages[0]

        if (errorMessage?.field === 'code') {
          router.push('/auth/forgot-password')
        }
      }
    }

    confirmCode()
  }, [searchParams])
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    trigger,
  } = useForm<FormType>({
    defaultValues: {
      newPassword: '',
      passwordConfirmation: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const onChangeNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setValue('newPassword', value)
    if (value) {
      clearErrors('newPassword')
    }
  }

  const onSubmit: SubmitHandler<FormType> = async data => {
    try {
      const res = createNewPassword({
        newPassword: data.newPassword,
        recoveryCode: code,
      }).unwrap()

      reset()
      // удалить потом все активные сессии
    } catch (error) {
      const typedError = error as { data: { messages: { field: string; message: string }[] } }

      if (typedError?.data?.messages && typedError.data.messages[0]?.message) {
        setError('newPassword', { message: typedError.data.messages[0].message, type: 'manual' })
      } else {
        setError('newPassword', { message: 'Server error', type: 'manual' })
      }
      reset()
    }
  }

  const onCloseModalHandler = () => {
    setIsModalOpen(false)
    if (isSuccess) {
      router.push('/auth/login')
    }
  }

  return (
    <div className={s.container}>
      <Card className={s.card}>
        <Typography as={'h1'} option={'h1'}>
          {'Forgot Password'}
        </Typography>
        <form className={s.content} noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputs}>
            <Input
              label={'New password'}
              placeholder={'сreate new password...'}
              type={'password'}
              {...register('newPassword', {
                onBlur: () => trigger('newPassword'),
              })}
              error={errors.newPassword && errors.newPassword.message}
              onChange={onChangeNewPassword}
            />
            <Input
              label={'Password confirmation'}
              placeholder={'confirm your password...'}
              type={'password'}
              {...register('passwordConfirmation')}
              error={errors.passwordConfirmation && errors.passwordConfirmation.message}
            />
          </div>
          <Typography as={'span'} className={s.text}>
            {'Your password must be between 6 and 20 characters'}
          </Typography>
          <Button disabled={isLoading} fullWidth variant={'primary'}>
            {'Create new password'}
          </Button>
        </form>
      </Card>
      {isError ||
        (isSuccess && (
          <Dialog
            className={s.modal}
            modalTitle={isError ? `Error ${err.status}` : 'Password Successfully Changed'}
            onClose={onCloseModalHandler}
            open={isModalOpen}
          >
            <div className={s.contentModal}>
              <Typography as={'span'} option={'regular_text16'}>
                {isError
                  ? err.data.messages[0].message
                  : 'Your password has been successfully updated. You can now log in with your new password.'}
              </Typography>
              <Button className={s.btnModal} onClick={onCloseModalHandler} variant={'primary'}>
                {'OK'}
              </Button>
            </div>
          </Dialog>
        ))}
    </div>
  )
}

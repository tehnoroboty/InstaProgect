'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { FormType, schema } from '@/src/features/createNewPassword/validators'
import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import {
  useCreateNewPasswordMutation,
  useRecoveryCodeMutation,
} from '@/src/shared/model/api/authApi'
import { CustomerError } from '@/src/shared/model/api/types'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { Button } from '@/src/shared/ui/button/Button'
import { Card } from '@/src/shared/ui/card/Card'
import { Dialog } from '@/src/shared/ui/dialog/Dialog'
import { Input } from '@/src/shared/ui/input/Input'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './createNewPasswordPage.module.scss'

export default function CreateNewPasswordCard() {
  const [createNewPassword, { error, isError, isLoading, isSuccess }] =
    useCreateNewPasswordMutation()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
  const err = error as CustomerError
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const [recoveryCode] = useRecoveryCodeMutation()
  const code = searchParams.get('code') as string

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

  useEffect(() => {
    ;(async () => {
      try {
        await recoveryCode({ recoveryCode: code }).unwrap()
      } catch (err) {
        const error = err as CustomerError
        const errorMessage = error.data?.messages[0]

        dispatch(setAppError({ error: errorMessage?.message }))
        if (errorMessage?.field === 'code') {
          router.push(AuthRoutes.FORGOT_PASSWORD)
        }
      }
    })()
  }, [code, dispatch, recoveryCode, router])

  const onChangeNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setValue('newPassword', value)
    if (value) {
      clearErrors('newPassword')
    }
  }

  const onSubmit: SubmitHandler<FormType> = async data => {
    try {
      await createNewPassword({
        newPassword: data.newPassword,
        recoveryCode: code,
      }).unwrap()

      reset()
    } catch (error) {
      const typedError = error as CustomerError

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
      router.push(AuthRoutes.LOGIN)
    }
  }

  return (
    <>
      <Card className={s.card}>
        <Typography as={'h1'} option={'h1'}>
          {'Create  New Password'}
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
    </>
  )
}

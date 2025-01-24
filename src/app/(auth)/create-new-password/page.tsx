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

import { useState } from 'react'

import { Dialog } from '@/src/components/dialog/Dialog'
import { useCreateNewPasswordMutation } from '@/src/store/services/authApi'
import { CustomerError } from '@/src/store/services/types'
import { useRouter } from 'next/navigation'

import s from './createNewPasswordPage.module.scss'

export default function CreateNewPasswordPage() {
  const [createNewPassword, { error, isError }] = useCreateNewPasswordMutation()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
  const err = error as CustomerError
  const router = useRouter()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormType>({
    defaultValues: {
      newPassword: '',
      passwordConfirmation: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormType> = data => {
    createNewPassword({
      newPassword: data.newPassword,
      recoveryCode: '123456', // узнать как получить
    })
      .unwrap()
      .then(res => {
        // удалить потом все активные сессии
        router.push('/login')
      })
      .catch(() => {
        reset()
      })
  }

  return (
    <div className={s.container}>
      <Card className={s.card}>
        <Typography as={'h1'} option={'h1'}>
          {'Forgot Password'}
        </Typography>
        <form className={s.content} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputs}>
            <Input
              label={'New password'}
              placeholder={'сreate new password...'}
              type={'password'}
              {...register('newPassword')}
              error={errors.newPassword && errors.newPassword.message}
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
          <Button fullWidth variant={'primary'}>
            {'Create new password'}
          </Button>
        </form>
      </Card>
      {isError && (
        <Dialog
          className={s.modal}
          modalTitle={`Error ${err.status}`}
          onClose={() => setIsModalOpen(false)}
          open={isModalOpen}
        >
          <div className={s.contentModal}>
            <Typography as={'span'} option={'regular_text16'}>
              {err.data.messages[0].message}
            </Typography>
            <Button
              className={s.btnModal}
              onClick={() => setIsModalOpen(false)}
              variant={'primary'}
            >
              {'OK'}
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  )
}

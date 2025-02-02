'use client'
import { useEffect } from 'react'

import { Button } from '@/src/components/button/Button'
import { Typography } from '@/src/components/typography/Typography'
import { useRegistrationConfirmationMutation } from '@/src/store/services/authApi'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './email-confirmed.module.scss'

export type ApiError = {
  data: ErrorResponse
  status: number
}

export type ErrorResponse = {
  error: string
  messages: [
    {
      field: string
      message: string
    },
  ]
  statusCode: number
}

export default function RegistrationСonfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [confirmRegistration] = useRegistrationConfirmationMutation()

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Получаем параметры через useSearchParams
        const code = searchParams.get('code') as string

        await confirmRegistration({ confirmationCode: code }).unwrap()
      } catch (err) {
        const error = err as ApiError
        const errorMessage = error.data?.messages[0]?.message

        // Проверяем сообщение об ошибке и выполняем перенаправление при необходимости
        if (errorMessage === 'Confirmation code is invalid') {
          router.push('/auth/registration-email-resending')
        }
      }
    }

    confirmEmail()
  }, [searchParams])

  return (
    <div className={s.container}>
      <Typography as={'h1'} option={'h1'}>
        {'Congratulations!'}
      </Typography>
      <Typography as={'h2'} option={'regular_text16'}>
        {'Your email has been confirmed'}
      </Typography>
      <Button as={Link} href={'/login'} variant={'primary'}>
        {'Sing In'}
      </Button>
      <Image alt={''} height={300} src={'/image/bro.svg'} width={432} />
    </div>
  )
}

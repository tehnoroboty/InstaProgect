'use client'
import { useEffect } from 'react'

import { Button } from '@/src/components/button/Button'
import { Typography } from '@/src/components/typography/Typography'
import { AuthRoutes } from '@/src/constants/routing'
import { useRegistrationConfirmationMutation } from '@/src/store/services/authApi'
import { CustomerError } from '@/src/store/services/types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import s from '@/src/features/registration-confirmation-form/email-confirmed.module.scss'

export const RegistrationConfirmationForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [confirmRegistration] = useRegistrationConfirmationMutation()

  useEffect(() => {
    ;(async () => {
      try {
        // Получаем параметры через useSearchParams
        const code = searchParams.get('code') as string

        await confirmRegistration({ confirmationCode: code }).unwrap()
      } catch (err) {
        const error = err as CustomerError
        const errorMessage = error.data?.messages[0]?.message

        // Проверяем сообщение об ошибке и выполняем перенаправление при необходимости
        if (errorMessage === 'Confirmation code is invalid') {
          router.push('/auth/registration-email-resending')
        }
      }
    })()
  }, [searchParams, confirmRegistration, router])

  return (
    <div className={s.container}>
      <Typography as={'h1'} option={'h1'}>
        {'Congratulations!'}
      </Typography>
      <Typography as={'h2'} option={'regular_text16'}>
        {'Your email has been confirmed'}
      </Typography>
      <Button as={Link} href={AuthRoutes.LOGIN} variant={'primary'}>
        {'Sing In'}
      </Button>
      <Image alt={''} height={300} src={'/image/bro.svg'} width={432} />
    </div>
  )
}

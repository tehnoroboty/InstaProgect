'use client'
import { useEffect } from 'react'

import { Button } from '@/src/components/button/Button'
import { Typography } from '@/src/components/typography/Typography'
import { useRegistrationConfirmationMutation } from '@/src/store/services/authApi'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import s from './email-confirmed.module.scss'

export default function RegistrationСonfirmationPage() {
  const searchParams = useSearchParams()
  const [confirmRegistration] = useRegistrationConfirmationMutation()

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Получаем параметры через useSearchParams
        const code = searchParams.get('code') as string

        console.log(code)
        await confirmRegistration({ confirmationCode: code }).unwrap()
      } catch (err) {}
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

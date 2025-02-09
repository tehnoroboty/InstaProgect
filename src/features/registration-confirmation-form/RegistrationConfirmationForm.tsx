'use client'
import { Button } from '@/src/components/button/Button'
import { Typography } from '@/src/components/typography/Typography'
import { useRegistrationConfirmationForm } from '@/src/features/registration-confirmation-form/hooks/useRegistrationConfirmationForm'
import Image from 'next/image'
import Link from 'next/link'

import s from '@/src/features/registration-confirmation-form/email-confirmed.module.scss'

export const RegistrationConfirmationForm = () => {
  useRegistrationConfirmationForm()

  return (
    <div className={s.container}>
      <Typography as={'h1'} option={'h1'}>
        {'Congratulations!'}
      </Typography>
      <Typography as={'h2'} option={'regular_text16'}>
        {'Your email has been confirmed'}
      </Typography>
      <Button as={Link} href={'/auth/login'} variant={'primary'}>
        {'Sing In'}
      </Button>
      <Image alt={''} height={300} src={'/image/bro.svg'} width={432} />
    </div>
  )
}

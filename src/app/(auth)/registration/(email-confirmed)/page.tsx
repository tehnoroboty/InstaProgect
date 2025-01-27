'use client'
import { Button } from '@/src/components/button/Button'
import { Typography } from '@/src/components/typography/Typography'
import Image from 'next/image'
import Link from 'next/link'

import s from './email-confirmed.module.scss'

export default function EmailConfirmedPage() {
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

'use client'
import ArrowBackOutline from '@/src/shared/assets/componentsIcons/ArrowBackOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { useRouter } from 'next/navigation'

import s from '../pageStyle.module.scss'

import { data } from '../data'

export default function PrivacyPolicyPage() {
  const router = useRouter()

  const goToBack = () => {
    router.back()
  }

  return (
    <div className={s.container}>
      <Button className={s.btn} onClick={goToBack} variant={'transparent'}>
        <ArrowBackOutline className={s.icon} />
        <Typography as={'span'} className={s.span}>
          {'Back to Sign Up'}
        </Typography>
      </Button>
      <div className={s.content}>
        <Typography as={'h1'} option={'h1'}>
          {data.privacyPolicy.title}
        </Typography>
        <Typography>{data.privacyPolicy.content}</Typography>
      </div>
    </div>
  )
}

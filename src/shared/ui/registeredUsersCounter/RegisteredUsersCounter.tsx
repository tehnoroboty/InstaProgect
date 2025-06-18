'use client'

import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './registeredUsersCounter.module.scss'

type CounterProps = {
  userCount: number
}

export const RegisteredUsersCounter = (props: CounterProps) => {
  const { userCount } = props
  const countArr = String(userCount).padStart(6, '0').split('')

  return (
    <div className={s.counterContainer}>
      {countArr.map((digit, idx) => (
        <span className={s.counterDigit} key={idx}>
          <Typography option={'h2'}>{digit}</Typography>
        </span>
      ))}
    </div>
  )
}

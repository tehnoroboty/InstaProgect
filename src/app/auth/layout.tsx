import { ReactNode } from 'react'

import { AuthWrapper } from '@/src/features/authWrapper/AuthWrapper'

import s from './auth.module.scss'

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <AuthWrapper>
      <div className={s.container}>{children}</div>
    </AuthWrapper>
  )
}

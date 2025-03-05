import React from 'react'

import { AuthWrapper } from '@/src/features/authWrapper/AuthWrapper'

import s from './auth.module.scss'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AuthWrapper login />
      <div className={s.container}>{children}</div>
    </>
  )
}

import React from 'react'

import { AuthWrapper } from '@/src/features/authWrapper/AuthWrapper'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AuthWrapper login />
      <div>{children}</div>
    </>
  )
}

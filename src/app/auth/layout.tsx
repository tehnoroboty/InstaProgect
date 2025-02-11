import React from 'react'

import { NavigationPanel } from '@/src/components/navigationPanel/NavigationPanel'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={'authWrapper'}>
      <section>{children}</section>
    </div>
  )
}

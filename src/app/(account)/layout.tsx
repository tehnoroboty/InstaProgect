import React from 'react'

import { NavigationPanel } from '@/src/widgets/navigationPanel/NavigationPanel'

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={'accountWrapper'}>
      <NavigationPanel />
      <section>{children}</section>
    </div>
  )
}

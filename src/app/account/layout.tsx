import React from 'react'

import { Header } from '@/src/widgets/header/Header'
import { NavigationPanel } from '@/src/widgets/navigationPanel/NavigationPanel'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header isLogged title={'Momenttify'} />
      <div className={'accountWrapper'}>
        <NavigationPanel />
        <section>{children}</section>
      </div>
    </>
  )
}

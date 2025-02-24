import React from 'react'

import { Header } from '@/src/widgets/header/Header'

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header title={'Momenttify'} />
      <div className={'accountWrapper'}>
        <section>{children}</section>
      </div>
    </>
  )
}

import React from 'react'

import { Header } from '@/src/widgets/header/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header title={'Momenttify'} />
      <section>{children}</section>
    </>
  )
}

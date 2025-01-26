import React from 'react'

import { NavigationPanel } from '@/src/components/navigationPanel/NavigationPanel'
import { StoreWrapper } from '@/src/store/StoreWrapper'
import { Metadata } from 'next'

import '../styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource-variable/inter'

import { Header } from '../components/header/Header'

export const metadata: Metadata = {
  icons: {
    icon: [
      { media: '(prefers-color-scheme: dark)', url: '/logo/light.svg' },
      { media: '(prefers-color-scheme: light)', url: '/logo/dark.svg' },
    ],
  },
  title: 'Momenttify',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body>
        <StoreWrapper>
          <div className={'main-layout'}>
            <Header isLoggedIn title={'Momenttify'} />
            <main>{children}</main>
          </div>
        </StoreWrapper>
      </body>
    </html>
  )
}

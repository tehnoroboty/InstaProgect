import React from 'react'

import { NavigationPanel } from '../widgets/navigationPanel/NavigationPanel'
import { StoreWrapper } from '@/src/shared/model/store/StoreWrapper'
import { CommonAlert } from '@/src/shared/ui/alerts/CommonAlert'
import { ProgressBar } from '@/src/shared/ui/progressBar/ProgressBar'
import { Header } from '@/src/widgets/header/Header'
import { Metadata } from 'next'

import '@fontsource-variable/inter'

import '@/src/shared/styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'

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
            <Header title={'Momenttify'} />
            <ProgressBar />
            <div className={'accountWrapper'}>
              <NavigationPanel />
              <main>{children}</main>
            </div>
          </div>
          <CommonAlert />
        </StoreWrapper>
      </body>
    </html>
  )
}

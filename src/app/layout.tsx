import React from 'react'

import { RequestMe } from '@/src/features/requestMe/requestMe'
import { StoreWrapper } from '@/src/shared/model/store/StoreWrapper'
import { CommonAlert } from '@/src/shared/ui/alerts/CommonAlert'
import { ProgressBar } from '@/src/shared/ui/progressBar/ProgressBar'
import { Header } from '@/src/widgets/header/Header'
import { Metadata } from 'next'

import '@/src/shared/styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource-variable/inter'

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
          <RequestMe>
            <div className={'main-layout'}>
              <ProgressBar />
              <main>{children}</main>
            </div>
            <CommonAlert />
          </RequestMe>
        </StoreWrapper>
      </body>
    </html>
  )
}

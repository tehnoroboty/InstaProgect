import React from 'react'
import { Metadata } from 'next'
import '../styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource-variable/inter'

export const metadata: Metadata = {
  title: 'Momenttify',
  icons: {
    icon: [
      { url: '/logo/light.svg', media: '(prefers-color-scheme: dark)' },
      { url: '/logo/dark.svg', media: '(prefers-color-scheme: light)' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body>{children}</body>
    </html>
  )
}

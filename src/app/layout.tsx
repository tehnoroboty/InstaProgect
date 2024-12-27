import '../styles/index.scss'
import React from 'react'

import '@fontsource-variable/inter'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

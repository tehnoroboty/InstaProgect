'use client'

import type { ReactNode } from 'react'

import { AuthProvider } from '@/src/app/providers/AuthProvider'

export const ClientWrapper = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}

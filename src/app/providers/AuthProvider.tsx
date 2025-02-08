import type { MeResponse } from '@/src/store/services/types'

import { type ReactNode, createContext, useContext } from 'react'

import { useMeQuery } from '@/src/store/services/authApi'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  isLoading: boolean
  user: MeResponse | undefined
}

const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  user: undefined,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { data: user, isError, isFetching } = useMeQuery()

  if (!isFetching && isError) {
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ isLoading: isFetching, user }}>{children}</AuthContext.Provider>
  )
}

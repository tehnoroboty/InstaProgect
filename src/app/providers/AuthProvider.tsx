import type { MeResponse } from '@/src/store/services/types'

import { type ReactNode, createContext, useContext } from 'react'

import { useMeQuery } from '@/src/store/services/authApi'
import { usePathname, useRouter } from 'next/navigation'

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
  const pathname = usePathname()
  const { data: user, isError, isFetching } = useMeQuery()

  const protectedRoutes = ['/home']

  if (!isFetching && !user && protectedRoutes.includes(pathname)) {
    router.push('/auth/login')
  }

  if (!isFetching && user && pathname === '/auth/login') {
    router.push('/home')
  }

  return (
    <AuthContext.Provider value={{ isLoading: isFetching, user }}>{children}</AuthContext.Provider>
  )
}

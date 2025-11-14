import { AUTH_KEYS } from '@/src/shared/lib/constants/auth-keys'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: 'include',
  fetchFn: (input, init = {}) => fetch(input, { cache: 'no-store', ...init }),
  prepareHeaders: headers => {
    const token = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN)

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

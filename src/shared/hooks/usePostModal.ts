'use client'

import { useCallback } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const usePostModal = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const open = useCallback(
    (id: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))

      params.set('postId', id)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams]
  )

  const close = useCallback(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))

    params.delete('postId')
    const newQuery = params.toString()

    router.replace(`${pathname}${newQuery ? `?${newQuery}` : ''}`, { scroll: false })
  }, [router, pathname, searchParams])

  return { close, open }
}

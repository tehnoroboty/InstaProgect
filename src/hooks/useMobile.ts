'use client'
import { useEffect, useState } from 'react'

const useMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= breakpoint)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(false)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}

export default useMobile

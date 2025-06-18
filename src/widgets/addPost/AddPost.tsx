'use client'
import { useEffect, useState } from 'react'

import { CreatePostPhoto } from '@/src/features/createPost/CreatePostPhoto'
import { CroppingPhoto } from '@/src/features/croppingPhoto/CroppingPhoto'
import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { useRouter } from 'next/navigation'

export const AddPost = () => {
  const [photos, setPhotos] = useState<string[]>([])
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    if (!token) {
      router.push(AuthRoutes.LOGIN)
    } else {
      setIsAuth(true)
    }
  }, [router])

  if (!isAuth) {
    router.push(AuthRoutes.LOGIN)
  }

  const createPhoto = (photo: string) => {
    return setPhotos(prevPhotos => [...prevPhotos, photo])
  }

  return (
    <>
      <CreatePostPhoto download={createPhoto} modalType={'post'} />
      {photos.length !== 0 && <CroppingPhoto photos={photos} />}
    </>
  )
}

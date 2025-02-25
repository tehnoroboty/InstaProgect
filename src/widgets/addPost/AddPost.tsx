'use client'
import { useState } from 'react'

import { CreatePost } from '@/src/features/createPost/CreatePost'
import { CroppingPhoto } from '@/src/features/croppingPhoto/CroppingPhoto'

export const AddPost = () => {
  const [photoFirst, setPhotoFirst] = useState('')
  const [photoSecond, setPhotoSecond] = useState([])

  const createPhoto = (photo: string) => {
    setPhotoFirst(photo)
  }

  return (
    <>
      <CreatePost download={createPhoto} />
      {photoFirst && <CroppingPhoto photo={photoFirst} />}
    </>
  )
}

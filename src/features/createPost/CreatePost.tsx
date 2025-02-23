'use client'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import ImageOutline from '@/src/shared/assets/componentsIcons/ImageOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import Image from 'next/image'

import s from './createPost.module.scss'

export const CreatePost = () => {
  const [photo, setPhoto] = useState<null | string>(null)

  const { getInputProps, getRootProps, open } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    multiple: false,
    noClick: true,
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0]
      const fileUrl = URL.createObjectURL(file)

      setPhoto(fileUrl)
    },
  })

  return (
    <div>
      <Dialog className={s.modal} modalTitle={'Add Photo'} onClose={() => {}} open>
        <div className={s.content}>
          {photo ? (
            <Image
              alt={'img'}
              className={s.photo}
              height={300}
              layout={'intrinsic'}
              //  layout={'responsive'}
              src={photo}
              width={300}
            />
          ) : (
            <div className={s.imageBox}>
              <ImageOutline height={48} width={48} />
            </div>
          )}
          <div className={s.buttons}>
            <Button onClick={open} variant={'primary'}>
              <input {...getInputProps()} />
              {'Select from Computer'}
            </Button>
            <Button variant={'bordered'}>{'Open Draft'}</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

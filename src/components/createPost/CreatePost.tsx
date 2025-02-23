'use client'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import ImageOutline from '@/src/assets/componentsIcons/ImageOutline'
import Image from 'next/image'

import s from './createPost.module.scss'

import { Button } from '../button/Button'
import { Dialog } from '../dialog/Dialog'

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

'use client'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import ImageOutline from '@/src/shared/assets/componentsIcons/ImageOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'

import s from './createPost.module.scss'

type Props = {
  download: (photo: string) => void
}

export const CreatePost = ({ download }: Props) => {
  const [openModal, setOpenModel] = useState<boolean>(true)

  const closeModal = () => setOpenModel(false)

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

      download(fileUrl)
      closeModal()
    },
  })

  return (
    <div>
      <Dialog className={s.modal} modalTitle={'Add Photo'} onClose={close} open={openModal}>
        <div className={s.content}>
          <div className={s.imageBox}>
            <ImageOutline height={48} width={48} />
          </div>
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

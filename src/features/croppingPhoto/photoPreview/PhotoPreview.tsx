'use client'

import { useDropzone } from 'react-dropzone'

import CloseOutline from '@/src/shared/assets/componentsIcons/CloseOutline'
import PlusCircleOutline from '@/src/shared/assets/componentsIcons/PlusCircleOutline'

import s from './photoPreview.module.scss'

type Props = {
  onDelete: (index: number) => void
  onSelect: (photo: string) => void
  onUpload: (photo: string) => void
  photos: string[]
}
export const PhotoPreview = ({ onDelete, onSelect, onUpload, photos }: Props) => {
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

      onUpload(fileUrl)
    },
  })

  return (
    <div className={s.photoPreview}>
      {photos.map((photo, index) => (
        <div className={s.photoItem} key={index} onClick={() => onSelect(photo)}>
          <img alt={`preview-${index}`} className={s.photoImg} src={photo} />
          <CloseOutline
            className={s.closeIcon}
            onClick={e => {
              e.stopPropagation() // Предотвращает выполнение onClick у родителя
              onDelete(index)
            }}
          />
        </div>
      ))}
      <div {...getRootProps()} className={s.plusCircleContainer}>
        <input {...getInputProps()} />
        <PlusCircleOutline className={s.plusCircleIcon} onClick={open} />
      </div>
    </div>
  )
}

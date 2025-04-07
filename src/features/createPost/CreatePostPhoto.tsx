import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'

import ImageOutline from '@/src/shared/assets/componentsIcons/ImageOutline'
import { MAX_SIZE_PHOTO } from '@/src/shared/lib/constants/regex'
import {
  selectIsPhotoModalOpen,
  selectIsPostModalOpen,
  setIsPhotoModalOpen,
  setIsPostModalOpen,
} from '@/src/shared/model/slices/modalSlice'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { errorMaxPhoto } from '@/src/widgets/addPost/data'

import s from './createPostPhoto.module.scss'

type ModalType = 'photo' | 'post'

type Props = {
  download: (photo: string) => void
  modalType: ModalType
}

export const CreatePostPhoto = ({ download, modalType }: Props) => {
  const dispatch = useDispatch()
  const [additionalModal, setAdditionalModal] = useState<boolean>(false)

  const isOpen = useSelector(modalType === 'photo' ? selectIsPhotoModalOpen : selectIsPostModalOpen)

  const closeModal = () => {
    const action =
      modalType === 'photo'
        ? setIsPhotoModalOpen({ isOpen: false })
        : setIsPostModalOpen({ isOpen: false })

    dispatch(action)
  }

  const onCloseAdditionalModal = () => setAdditionalModal(false)

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

      if (file.size > MAX_SIZE_PHOTO) {
        setAdditionalModal(true)
      } else {
        download(fileUrl)
        closeModal()
      }
    },
  })

  return (
    <div>
      <Dialog className={s.modal} modalTitle={'Add Photo'} onClose={closeModal} open={isOpen}>
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
      <Dialog
        className={s.additionalModal}
        modalTitle={errorMaxPhoto.title}
        onClose={onCloseAdditionalModal}
        open={additionalModal}
      >
        <>
          {errorMaxPhoto.text}
          <div className={s.additionalModalBtn}>
            <Button onClick={onCloseAdditionalModal}>{'OK'}</Button>
          </div>
        </>
      </Dialog>
    </div>
  )
}

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'

import { ModalType } from '@/src/features/croppingPhoto/types'
import ImageOutline from '@/src/shared/assets/componentsIcons/ImageOutline'
import { MAX_SIZE_PHOTO } from '@/src/shared/lib/constants/regex'
import { setIsPhotoModalOpen, setIsPostModalOpen } from '@/src/shared/model/slices/modalSlice'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { errorMaxPhoto } from '@/src/widgets/addPost/data'

import s from './createPostPhoto.module.scss'

type Props = {
  download: (photo: string) => void
  modalType: ModalType
}

export const CreatePostPhoto = ({ download, modalType }: Props) => {
  const dispatch = useDispatch()

  const [openModal, setOpenModel] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)

  const closeModal = () => {
    setOpenModel(false)
  }

  const closeStateModal = () => {
    const action =
      modalType === 'photo'
        ? setIsPhotoModalOpen({ isOpen: false })
        : setIsPostModalOpen({ isOpen: false })

    dispatch(action)
  }

  const onCloseErrorAlert = () => setErrorMessage(null)

  const { getInputProps, open } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    multiple: false,
    noClick: true,
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0]

      if (!file) {
        return
      }
      const fileUrl = URL.createObjectURL(file)

      if (file.size > MAX_SIZE_PHOTO) {
        setErrorMessage(errorMaxPhoto.text)
      } else {
        download(fileUrl)
        closeModal()
      }
    },
    onDropRejected: fileRejections => {
      const rejectedFile = fileRejections[0]?.file

      if (rejectedFile) {
        setErrorMessage('The format of the uploaded photo must be PNG and JPEG')
      }
    },
  })

  return (
    <div>
      <Dialog
        className={s.modal}
        modalTitle={modalType === 'photo' ? 'Add a Profile Photo' : 'Add Photo'}
        onClose={closeStateModal}
        open={openModal}
      >
        <div className={s.content}>
          {errorMessage && (
            <Alerts
              autoClose
              className={s.alert}
              closable
              closeFn={onCloseErrorAlert}
              message={errorMessage}
              position={'static'}
              type={'error'}
            />
          )}
          <div className={s.imageBox}>
            <ImageOutline height={48} width={48} />
          </div>
          <div className={s.buttons}>
            <Button onClick={open} variant={'primary'}>
              <input {...getInputProps()} />
              {'Select from Computer'}
            </Button>
            {modalType !== 'photo' && <Button variant={'bordered'}>{'Open Draft'}</Button>}
          </div>
        </div>
      </Dialog>
    </div>
  )
}

import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { closeModalMessage, closePhotoModalMessage } from '@/src/widgets/addPost/data'

import s from './exitModal.module.scss'

type BaseProps = {
  onCloseModal: () => void
  onCloseParentModal: () => void
  open: boolean
}

type PhotoProps = BaseProps & {
  modalType: 'photo'
}

type PostProps = BaseProps & {
  modalType: 'post'
  onDiscard: () => void
  onSaveDraft: () => void
}
type Props = PhotoProps | PostProps

export const ExitModal = (props: Props) => {
  const { modalType, onCloseModal, onCloseParentModal, open } = props

  const handleCloseModal = () => {
    onCloseModal()
  }

  const handleClose = () => {
    onCloseModal()
    onCloseParentModal()
  }
  const handleDiscard = () => {
    if (props.modalType === 'post') {
      props.onDiscard()
      handleClose()
    }
  }

  const handleSaveDraft = () => {
    if (props.modalType === 'post') {
      props.onSaveDraft()
      handleClose()
    }
  }

  return (
    <Dialog
      className={s.additionalModal}
      modalTitle={closeModalMessage.title}
      onClose={onCloseModal}
      open={open}
    >
      {modalType === 'photo' ? (
        <div>
          {closePhotoModalMessage.text}
          <div className={s.additionalModalBtns}>
            <Button onClick={handleClose} variant={'bordered'}>
              {'Yes'}
            </Button>
            <Button onClick={handleCloseModal} variant={'primary'}>
              {'No'}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {closeModalMessage.text}
          <div className={s.additionalModalBtns}>
            <Button onClick={handleDiscard} variant={'bordered'}>
              {'Discard'}
            </Button>
            <Button onClick={handleSaveDraft} variant={'primary'}>
              {'Save Draft'}
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  )
}

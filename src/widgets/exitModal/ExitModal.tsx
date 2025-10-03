import { ModalType } from '@/src/features/croppingPhoto/types'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { closeModalMessage, closePhotoModalMessage } from '@/src/widgets/addPost/data'

import s from './exitModal.module.scss'

type Props = {
  modalType: ModalType
  onCloseModal: () => void
  onCloseParentModal: () => void
  onDiscard: () => void
  onSaveDraft: () => void
  open: boolean
}

export const ExitModal = ({
  modalType,
  onCloseModal,
  onCloseParentModal,
  onDiscard,
  onSaveDraft,
  open,
}: Props) => {
  const handleCloseModal = () => {
    onCloseModal()
  }

  const handleClose = () => {
    onCloseModal()
    onCloseParentModal()
  }
  const handleDiscard = () => {
    onDiscard()
    handleClose()
  }
  const handleSaveDraft = () => {
    onSaveDraft()
    handleClose()
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

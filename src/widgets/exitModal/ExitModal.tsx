import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { closeModalMessage } from '@/src/widgets/addPost/data'

import s from './exitModal.module.scss'

type Props = {
  onCloseModal: () => void
  onCloseParentModal: () => void
  onSaveDraft: () => void
  open: boolean
}

export const ExitModal = ({ onCloseModal, onCloseParentModal, onSaveDraft, open }: Props) => {
  const onClickDiscard = () => {
    onCloseModal()
    onCloseParentModal()
  }

  return (
    <Dialog
      className={s.additionalModal}
      modalTitle={closeModalMessage.title}
      onClose={onCloseModal}
      open={open}
    >
      <div>
        {closeModalMessage.text}
        <div className={s.additionalModalBtns}>
          <Button onClick={onClickDiscard} variant={'bordered'}>
            {'Discard'}
          </Button>
          <Button onClick={onSaveDraft} variant={'primary'}>
            {'Save Draft'}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from './сonfirmationModal.module.scss'

type Props = {
  className?: string
  modalMessage: string
  modalTitle: string
  onClickNo: () => void
  onCloseModal: () => void
  onCloseParentModal: () => void
  open: boolean
}

export const ConfirmationModal = ({
  className,
  modalMessage,
  modalTitle,
  onClickNo,
  onCloseModal,
  onCloseParentModal,
  open,
}: Props) => {
  const onClickYes = () => {
    onCloseModal()
    onCloseParentModal()
  }

  return (
    <Dialog
      className={clsx(s.additionalModal, className)}
      modalTitle={modalTitle}
      onClose={onCloseModal}
      open={open}
    >
      <div>
        <Typography option={'regular_text16'}>{modalMessage}</Typography>
        <div className={s.additionalModalBtns}>
          <Button className={s.btn} onClick={onClickYes} variant={'bordered'}>
            {'Yes'}
          </Button>
          <Button className={s.btn} onClick={onClickNo} variant={'primary'}>
            {'No'}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

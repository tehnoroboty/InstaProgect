import { Dialog } from '@/src/shared/ui/dialog'

type Props = {
  onClose: () => void
  open: boolean
}

export const FollowingModal = ({ onClose, open }: Props) => {
  return (
    <Dialog modalTitle={'Following'} onClose={onClose} open={open}>
      <div>1223</div>
      <div>1223</div>
      <div>1223</div>
    </Dialog>
  )
}

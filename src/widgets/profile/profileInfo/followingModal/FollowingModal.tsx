import { useGetFollowingQuery } from '@/src/shared/model/api/followingApi'
import { Dialog } from '@/src/shared/ui/dialog'
import { UserListItem } from '@/src/widgets/userListItem/UserListItem'

type Props = {
  onClose: () => void
  open: boolean
  userName: string
}

export const FollowingModal = ({ onClose, open, userName }: Props) => {
  const { data: getFollowingData } = useGetFollowingQuery({ userName })

  return (
    <Dialog
      modalTitle={`${getFollowingData?.items.length} Following`}
      onClose={onClose}
      open={open}
    >
      <UserListItem data={getFollowingData?.items} />
    </Dialog>
  )
}

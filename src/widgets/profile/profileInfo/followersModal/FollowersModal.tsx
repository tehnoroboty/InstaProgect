import { useGetFollowersQuery } from '@/src/shared/model/api/followingApi'
import { Dialog } from '@/src/shared/ui/dialog'
import { UserListItem } from '@/src/widgets/userListItem/UserListItem'

type Props = {
  onClose: () => void
  open: boolean
  userName: string
}

export const FollowersModal = ({ onClose, open, userName }: Props) => {
  const { data: getFollowersData } = useGetFollowersQuery({ userName })

  return (
    <Dialog
      modalTitle={`${getFollowersData?.items.length} Followers`}
      onClose={onClose}
      open={open}
    >
      <UserListItem data={getFollowersData?.items} />
    </Dialog>
  )
}

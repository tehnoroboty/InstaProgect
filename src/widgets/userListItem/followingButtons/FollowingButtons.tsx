import { Button } from '@/src/shared/ui/button/Button'

type Props = {
  isFollowing: boolean
  // onFollow: (userId: number, isCurrentlyFollowing: boolean) => void
  openModal: (open: boolean) => void
  setSelectedUser: (user: { isFollowing: boolean; userId: number }) => void
  userId: number
}

export const FollowingButtons = ({ isFollowing, openModal, setSelectedUser, userId }: Props) => {
  const handleClick = () => {
    setSelectedUser({ isFollowing, userId })
    openModal(true)
  }

  return (
    <Button onClick={handleClick} variant={isFollowing ? 'bordered' : 'primary'}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

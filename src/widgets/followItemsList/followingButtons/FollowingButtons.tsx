import { Button } from '@/src/shared/ui/button/Button'

type Props = {
  isFollowing: boolean
  isLoading: boolean
  onFollow: () => void
  openModal: (open: boolean) => void
}

export const FollowingButtons = ({ isFollowing, isLoading, openModal }: Props) => {
  const handleClick = () => {
    openModal(true)
  }

  return (
    <Button
      disabled={isLoading}
      onClick={handleClick}
      variant={isFollowing ? 'bordered' : 'primary'}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

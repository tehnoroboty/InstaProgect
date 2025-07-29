import { Button } from '@/src/shared/ui/button/Button'

type Props = {
  isFollowing: boolean
  isLoading: boolean
  isMyProfile: boolean
  onFollow: () => void
  openModal: (open: boolean) => void
}

export const FollowingButtons = ({ isFollowing, isLoading, isMyProfile, openModal }: Props) => {
  const handleClick = () => {
    openModal(true)
  }

  return (
    <>
      {!isMyProfile && (
        <Button
          disabled={isLoading}
          onClick={handleClick}
          variant={isFollowing ? 'bordered' : 'primary'}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      )}{' '}
    </>
  )
}

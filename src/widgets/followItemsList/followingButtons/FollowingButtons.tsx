import { Button } from '@/src/shared/ui/button/Button'

type Props = {
  isFollowing: boolean
  isLoading: boolean
  isMyProfile: boolean
  onFollow: () => void
  openModal: (open: boolean) => void
}

export const FollowingButtons = ({
  isFollowing,
  isLoading,
  isMyProfile,
  onFollow,
  openModal,
}: Props) => {
  const handleUnfollowClick = () => {
    openModal(true)
  }

  const handleFollowClick = () => {
    onFollow()
  }

  return (
    <>
      {!isMyProfile && (
        <Button
          disabled={isLoading}
          onClick={isFollowing ? handleUnfollowClick : handleFollowClick}
          variant={isFollowing ? 'bordered' : 'primary'}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      )}{' '}
    </>
  )
}

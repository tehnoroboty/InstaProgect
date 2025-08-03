import { Button } from '@/src/shared/ui/button/Button'

type Props = {
  className?: string
  isFollowing: boolean
  isLoading: boolean
  isMyProfile: boolean
  onFollow: () => void
  openModal: (open: boolean) => void
}

export const FollowingButtons = ({
  className,
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
          className={className}
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

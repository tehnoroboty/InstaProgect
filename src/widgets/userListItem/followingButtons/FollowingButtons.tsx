import { Button } from '@/src/shared/ui/button/Button'

type Props = {
  isFollowing?: boolean
}

export const FollowingButtons = ({ isFollowing }: Props) => {
  return (
    <Button variant={isFollowing ? 'bordered' : 'primary'}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

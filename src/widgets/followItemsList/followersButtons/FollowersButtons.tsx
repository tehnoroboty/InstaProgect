import { Button } from '@/src/shared/ui/button/Button'

import s from './followersButtons.module.scss'

type Props = {
  isFollowing?: boolean
  isLoading: boolean
  onFollow: () => void
  openModal: (open: boolean) => void
}

export const FollowersButtons = ({ isFollowing, isLoading, onFollow, openModal }: Props) => {
  const handleDeleteClick = () => {
    openModal(true)
  }

  const handleFollowClick = () => {
    onFollow()
  }

  return (
    <div className={s.buttons}>
      {!isFollowing ? (
        <Button className={s.button} disabled={isLoading} onClick={handleFollowClick}>
          Follow
        </Button>
      ) : (
        <Button
          className={s.button}
          disabled={isLoading}
          onClick={handleDeleteClick}
          variant={'transparent'}
        >
          Delete
        </Button>
      )}
    </div>
  )
}

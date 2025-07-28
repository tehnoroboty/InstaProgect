import { Button } from '@/src/shared/ui/button/Button'

import s from './followersButtons.module.scss'

type Props = {
  isFollowing?: boolean
  isLoading: boolean
  // onFollow: () => void
  openModal: (open: boolean) => void
}

export const FollowersButtons = ({ isFollowing, isLoading, openModal }: Props) => {
  const handleClick = () => {
    openModal(true)
  }

  return (
    <div className={s.buttons}>
      {!isFollowing ? (
        <Button className={s.deleteButton} disabled={isLoading} onClick={handleClick}>
          Follow
        </Button>
      ) : (
        <Button
          className={s.deleteButton}
          disabled={isLoading}
          onClick={handleClick}
          variant={'transparent'}
        >
          Delete
        </Button>
      )}
    </div>
  )
}

import { Button } from '@/src/shared/ui/button/Button'
import clsx from 'clsx'

import s from './followersButtons.module.scss'

type Props = {
  className?: string
  isFollowing?: boolean
  isLoading: boolean
  isMyProfile: boolean
  onFollow: () => void
  openModal: (open: boolean) => void
}

export const FollowersButtons = ({
  className,
  isFollowing,
  isLoading,
  isMyProfile,
  onFollow,
  openModal,
}: Props) => {
  const handleDeleteClick = () => {
    openModal(true)
  }

  const handleFollowClick = () => {
    onFollow()
  }

  return (
    <>
      {!isMyProfile && (
        <div className={s.buttons}>
          {!isFollowing ? (
            <Button
              className={clsx(s.button, className)}
              disabled={isLoading}
              onClick={handleFollowClick}
            >
              Follow
            </Button>
          ) : (
            <Button
              className={clsx(s.button, className)}
              disabled={isLoading}
              onClick={handleDeleteClick}
              variant={'transparent'}
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </>
  )
}

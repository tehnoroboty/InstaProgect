import { Button } from '@/src/shared/ui/button/Button'

import s from './followersButtons.module.scss'

type Props = {
  isFollowing?: boolean
}

export const FollowersButtons = ({ isFollowing }: Props) => {
  return (
    <div className={s.buttons}>
      {!isFollowing && <Button className={s.deleteButton}>Follow</Button>}
      <Button className={s.deleteButton} variant={'transparent'}>
        Delete
      </Button>
    </div>
  )
}

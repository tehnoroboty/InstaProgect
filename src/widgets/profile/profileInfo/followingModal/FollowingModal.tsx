import { useState } from 'react'

import { CustomerError } from '@/src/entities/errors/types'
import {
  useFollowMutation,
  useGetFollowingQuery,
  useUnFollowMutation,
} from '@/src/shared/model/api/followingApi'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { SocialModal } from '@/src/widgets/socialModal/SocialModal'
import { UserListItem } from '@/src/widgets/userListItem/UserListItem'

type Props = {
  onClose: () => void
  open: boolean
  userName: string
}

export const FollowingModal = ({ onClose, open, userName }: Props) => {
  const [searchValue, setSearchValue] = useState('')
  const { data: getFollowingData } = useGetFollowingQuery({ search: searchValue, userName })

  const [follow] = useFollowMutation()
  const [unFollow] = useUnFollowMutation()

  const dispatch = useAppDispatch()

  const handleFollow = async (userId: number, isCurrentlyFollowing: boolean) => {
    try {
      if (isCurrentlyFollowing) {
        await unFollow(userId).unwrap()
      } else {
        await follow(userId).unwrap()
      }
    } catch (err) {
      const error = err as CustomerError
      const errorMessage =
        error.data?.messages[0].message || error.data?.error || 'Some error occurred'

      dispatch(setAppError({ error: errorMessage }))
    }
  }

  return (
    <SocialModal
      onClose={onClose}
      onSearchChange={setSearchValue}
      open={open}
      title={`${getFollowingData?.items.length} Following`}
    >
      <UserListItem data={getFollowingData?.items} onFollow={handleFollow} />
    </SocialModal>
  )
}

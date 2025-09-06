import { useState } from 'react'

import { useGetFollowersQuery } from '@/src/shared/model/api/followingApi'
import { selectIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { FollowItemsList } from '@/src/widgets/followItemsList/FollowItemsList'
import { SocialModal } from '@/src/widgets/socialModal/SocialModal'

type Props = {
  onClose: () => void
  open: boolean
  userName: string
}

export const FollowersModal = ({ onClose, open, userName }: Props) => {
  const [searchValue, setSearchValue] = useState('')
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { data: getFollowersData } = useGetFollowersQuery(
    { search: searchValue, userName },
    { skip: !isLoggedIn }
  )

  const handleClose = () => {
    onClose()
  }

  return (
    <SocialModal
      onClose={handleClose}
      onSearchChange={setSearchValue}
      open={open}
      title={`${getFollowersData?.items.length} Followers`}
    >
      <FollowItemsList data={getFollowersData?.items} isFollowers />
    </SocialModal>
  )
}

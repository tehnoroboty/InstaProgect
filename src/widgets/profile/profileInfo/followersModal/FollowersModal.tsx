import { useState } from 'react'

import { useGetFollowersQuery } from '@/src/shared/model/api/followingApi'
import { SocialModal } from '@/src/widgets/socialModal/SocialModal'
import { UserListItem } from '@/src/widgets/userListItem/UserListItem'

type Props = {
  onClose: () => void
  open: boolean
  userName: string
}

export const FollowersModal = ({ onClose, open, userName }: Props) => {
  const [searchValue, setSearchValue] = useState('')
  const { data: getFollowersData } = useGetFollowersQuery({ search: searchValue, userName })

  return (
    <SocialModal
      onClose={onClose}
      onSearchChange={setSearchValue}
      open={open}
      title={`${getFollowersData?.items.length} Followers`}
    >
      <UserListItem data={getFollowersData?.items} isFollowers />
    </SocialModal>
  )
}

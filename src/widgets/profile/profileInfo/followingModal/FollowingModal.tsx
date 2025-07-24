import { useState } from 'react'

import { useGetFollowingQuery } from '@/src/shared/model/api/followingApi'
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

  return (
    <SocialModal
      onClose={onClose}
      onSearchChange={setSearchValue}
      open={open}
      title={`${getFollowingData?.items.length} Following`}
    >
      <UserListItem data={getFollowingData?.items} />
    </SocialModal>
  )
}

'use client'

import { useState } from 'react'

import { useGetFollowersQuery } from '@/src/shared/model/api/followingApi'
import { FollowItemsList } from '@/src/widgets/followItemsList/FollowItemsList'
import { SocialModal } from '@/src/widgets/socialModal/SocialModal'

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
      <FollowItemsList data={getFollowersData?.items} isFollowers />
    </SocialModal>
  )
}

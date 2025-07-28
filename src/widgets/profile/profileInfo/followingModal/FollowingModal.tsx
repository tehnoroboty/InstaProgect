'use client'

import { useState } from 'react'

import { useGetFollowingQuery } from '@/src/shared/model/api/followingApi'
import { FollowItemsList } from '@/src/widgets/followItemsList/FollowItemsList'
import { SocialModal } from '@/src/widgets/socialModal/SocialModal'

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
      <FollowItemsList data={getFollowingData?.items} isFollowers={false} />
    </SocialModal>
  )
}

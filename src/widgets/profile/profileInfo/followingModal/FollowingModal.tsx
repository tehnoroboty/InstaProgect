'use client'
import { useState } from 'react'

import { useGetFollowingQuery } from '@/src/shared/model/api/followingApi'
import { setIsFollowingModalOpen } from '@/src/shared/model/slices/modalSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { FollowItemsList } from '@/src/widgets/followItemsList/FollowItemsList'
import { SocialModal } from '@/src/widgets/socialModal/SocialModal'

type Props = {
  open: boolean
  userName: string
}

export const FollowingModal = ({ open, userName }: Props) => {
  const [searchValue, setSearchValue] = useState('')
  const { data: getFollowingData } = useGetFollowingQuery({ search: searchValue, userName })
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(setIsFollowingModalOpen({ isOpen: false }))
  }

  return (
    <SocialModal
      onClose={handleClose}
      onSearchChange={setSearchValue}
      open={open}
      title={`${getFollowingData?.items.length} Following`}
    >
      <FollowItemsList data={getFollowingData?.items} isFollowers={false} />
    </SocialModal>
  )
}

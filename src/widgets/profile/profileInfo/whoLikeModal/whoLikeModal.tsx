'use client'

import { useState } from 'react'

import { useGetPostLikesQuery } from '@/src/shared/model/api/postsApi'
import { setIsFollowingModalOpen } from '@/src/shared/model/slices/modalSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { FollowItemsList } from '@/src/widgets/followItemsList/FollowItemsList'
import { SocialModal } from '@/src/widgets/socialModal/SocialModal'

type Props = {
  open: boolean
  postId: number
}

export const WhoLikeModal = ({ open, postId }: Props) => {
  const [searchValue, setSearchValue] = useState('')

  const { data: likesData } = useGetPostLikesQuery({ postId, search: searchValue })
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(setIsFollowingModalOpen({ isOpen: false }))
  }

  return (
    <SocialModal onClose={handleClose} onSearchChange={setSearchValue} open={open} title={'Likes'}>
      <FollowItemsList data={likesData?.items} isFollowers={false} />
    </SocialModal>
  )
}

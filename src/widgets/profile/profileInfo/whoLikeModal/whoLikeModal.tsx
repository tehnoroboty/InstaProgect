import { useState } from 'react'

import { useGetPostLikesQuery } from '@/src/shared/model/api/postsApi'
import { FollowItemsList } from '@/src/widgets/followItemsList/FollowItemsList'
import { SocialModal } from '@/src/widgets/socialModal/SocialModal'

type Props = {
  onClose: () => void
  open: boolean
  postId: number
}

export const WhoLikeModal = ({ onClose, open, postId }: Props) => {
  const [searchValue, setSearchValue] = useState('')

  const { data: likesData } = useGetPostLikesQuery({ postId, search: searchValue })

  const handleClose = () => {
    onClose()
  }

  return (
    <SocialModal onClose={handleClose} onSearchChange={setSearchValue} open={open} title={'Likes'}>
      <FollowItemsList data={likesData?.items} isFollowers={false} />
    </SocialModal>
  )
}

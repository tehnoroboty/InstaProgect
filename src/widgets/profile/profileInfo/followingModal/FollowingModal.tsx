import { useState } from 'react'

import { useGetFollowingQuery } from '@/src/shared/model/api/followingApi'
import { selectIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { FollowItemsList } from '@/src/widgets/followItemsList/FollowItemsList'
import { SocialModal } from '@/src/widgets/socialModal/SocialModal'

type Props = {
  onClose: () => void
  open: boolean
  userName: string
}

export const FollowingModal = ({ onClose, open, userName }: Props) => {
  const [searchValue, setSearchValue] = useState('')
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  // Проверяем, что userName валидный перед выполнением запроса
  const isValidUserName = userName && userName.trim().length > 0

  const { data: getFollowingData } = useGetFollowingQuery(
    {
      pageSize: 100,
      search: searchValue,
      userName: isValidUserName ? userName : '',
    },
    { skip: !isLoggedIn || !isValidUserName || !open }
  )

  const handleClose = () => {
    onClose()
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

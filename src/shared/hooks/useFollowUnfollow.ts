import { CustomerError } from '@/src/entities/errors/types'
import { useFollowMutation, useUnFollowMutation } from '@/src/shared/model/api/followingApi'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'

export const useFollowUnfollow = (userId: number, isCurrentlyFollowing: boolean) => {
  const [follow, { isLoading: isLoadingFollow }] = useFollowMutation()
  const [unFollow, { isLoading: isLoadingUnFollow }] = useUnFollowMutation()

  const isLoading = isLoadingFollow || isLoadingUnFollow
  const dispatch = useAppDispatch()

  const handleFollow = async () => {
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

  return { handleFollow, isLoading }
}

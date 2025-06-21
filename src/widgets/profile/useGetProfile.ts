import { Dispatch, useEffect, useMemo } from 'react'

import { PublicProfileTypes } from '@/src/entities/user/types'
import { useGetUserProfileQuery, usersApi } from '@/src/shared/model/api/usersApi'
import { useAppSelector } from '@/src/shared/model/store/store'

type Props = {
  authProfile: boolean
  dispatch: Dispatch<any>
  isMeDataUserName: boolean
  profileDataFromServer?: PublicProfileTypes
  userId: string
}

export const useGetProfile = ({
  authProfile,
  dispatch,
  isMeDataUserName,
  profileDataFromServer,
  userId,
}: Props) => {
  const selectUserProfileById = useMemo(
    () => usersApi.endpoints.getUserProfileById.select(Number(userId)),
    [userId]
  )

  const { data: profileFromCash } = useAppSelector(state => selectUserProfileById(state))

  const needInitProfileInStore = !!profileDataFromServer && !profileFromCash

  useEffect(() => {
    if (needInitProfileInStore) {
      dispatch(
        usersApi.util.upsertQueryData('getUserProfileById', Number(userId), profileDataFromServer)
      )
    }
  }, [dispatch, needInitProfileInStore, profileDataFromServer, userId])

  const { data: profileByName } = useGetUserProfileQuery(profileFromCash?.userName ?? '', {
    skip: !isMeDataUserName || !profileFromCash?.userName || !authProfile,
  })

  const profileDataForRender = useMemo(() => {
    return profileByName
      ? {
          aboutMe: profileByName?.aboutMe,
          avatarUrl: profileByName?.avatars[0]?.url ?? '',
          followersCount: profileByName?.followersCount,
          followingCount: profileByName?.followingCount,
          id: +userId,
          isFollowing: profileByName?.isFollowing,
          publicationsCount: profileByName?.publicationsCount,
          userName: profileByName?.userName,
        }
      : {
          aboutMe: profileDataFromServer?.aboutMe ?? '',
          avatarUrl: profileDataFromServer?.avatars[0]?.url ?? '',
          followersCount: profileDataFromServer?.userMetadata.followers ?? 0,
          followingCount: profileDataFromServer?.userMetadata.following ?? 0,
          id: +userId,
          isFollowing: false,
          publicationsCount: profileDataFromServer?.userMetadata.publications ?? 0,
          userName: profileDataFromServer?.userName ?? '',
        }
  }, [profileByName, profileDataFromServer, userId])

  return { profileDataForRender }
}

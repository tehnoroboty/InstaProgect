import { Dispatch, useEffect } from 'react'

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
  const { data: profileFromCash } = useAppSelector(state =>
    usersApi.endpoints.getUserProfileById.select(Number(userId))(state)
  )

  const needInitProfileInStore = !!profileDataFromServer && !profileFromCash

  useEffect(() => {
    if (needInitProfileInStore) {
      dispatch(
        usersApi.util.upsertQueryData('getUserProfileById', Number(userId), profileDataFromServer)
      )
    }
  }, [needInitProfileInStore])

  const { data: profileByName } = useGetUserProfileQuery(profileFromCash?.userName ?? '', {
    skip: !isMeDataUserName || !profileFromCash?.userName || !authProfile,
  })

  const profileDataForRender = profileByName
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

  return { profileDataForRender }
}

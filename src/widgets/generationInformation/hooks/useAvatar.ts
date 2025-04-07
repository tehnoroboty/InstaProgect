import { useState } from 'react'

import { useDeleteProfileAvatarMutation } from '@/src/shared/model/api/usersApi'

export const useAvatar = (setAlertMessage: Function, setAlertType: Function) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [deleteAvatar, { isLoading: isLoadingDelete }] = useDeleteProfileAvatarMutation()

  const deleteAvatarHandler = async () => {
    try {
      await deleteAvatar().unwrap()
    } catch (error) {
      setAlertMessage('Error! Server is not available!')
      setAlertType('error')
    } finally {
      setDeleteModal(false)
    }
  }

  return { deleteAvatarHandler, deleteModal, isLoadingDelete, setDeleteModal }
}

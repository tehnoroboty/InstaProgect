import React from 'react'

import { Avatar } from '@/src/entities/user/types'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import clsx from 'clsx'

import s from './avatarContainerSettings.module.scss'

type Props = {
  deleteModal: () => void
  isLoadingDelete: boolean
  myProfileAvatars: Array<Avatar> | undefined
}

export const AvatarContainerSettings = ({
  deleteModal,
  isLoadingDelete,
  myProfileAvatars,
}: Props) => {
  return (
    <div className={s.photoBox}>
      <div className={s.avatarContainer}>
        <AvatarBox className={s.avatar} src={myProfileAvatars?.[0]?.url ?? ''} />
        {myProfileAvatars?.[0]?.url && (
          <button
            className={clsx(s.deleteBtn, { [s.disabledBtnDelete]: isLoadingDelete })}
            disabled={isLoadingDelete}
            onClick={() => deleteModal()}
            type={'button'}
          ></button>
        )}
      </div>
      <Button type={'button'} variant={'bordered'}>
        {'Add a Profile Photo'}
      </Button>
    </div>
  )
}

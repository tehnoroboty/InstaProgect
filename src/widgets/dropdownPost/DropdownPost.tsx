import React from 'react'

import {
  CopyOutline,
  Edit2Outline,
  PersonAddOutline,
  PersonRemoveOutline,
  TrashOutline,
} from '@/src/shared/assets/componentsIcons'
import { Dropdown, DropdownMenuItems } from '@/src/shared/ui/dropdown/Dropdown'

type Props = {
  className?: string
  isFollowedBy: boolean
  isOurPost: boolean
  onDelete?: () => void
  onEdit?: () => void
}

export const DropdownPost = ({ className, isFollowedBy, isOurPost, onDelete, onEdit }: Props) => {
  const ourPostActions: DropdownMenuItems[] = [
    {
      icon: Edit2Outline,
      id: '1',
      onClick: onEdit,
      title: 'Edit Post',
    },
    {
      icon: TrashOutline,
      id: '2',
      onClick: onDelete,
      title: 'Delete Post',
    },
  ]
  const ourFolloweeActions: DropdownMenuItems[] = [
    {
      icon: PersonRemoveOutline,
      id: '1',
      onClick: () => {},
      title: 'Unfollow',
    },
    {
      icon: CopyOutline,
      id: '2',
      onClick: () => {},
      title: 'Copy Link',
    },
  ] //пользователь, которого мы фолловим
  const nonFolloweeActions: DropdownMenuItems[] = [
    {
      icon: PersonAddOutline,
      id: '1',
      onClick: () => {},
      title: 'Follow',
    },
    {
      icon: CopyOutline,
      id: '2',
      onClick: () => {},
      title: 'Copy Link',
    },
  ] // пользователь, которого НЕ фолловим

  // eslint-disable-next-line no-nested-ternary
  const menuItems: DropdownMenuItems[] = isOurPost
    ? ourPostActions
    : isFollowedBy
      ? ourFolloweeActions
      : nonFolloweeActions

  return (
    <div className={className}>
      <Dropdown list={menuItems} />
    </div>
  )
}

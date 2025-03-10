import React from 'react'

import {
  CopyOutline,
  Edit2Outline,
  MoreHorizontalOutline,
  PersonAddOutline,
  PersonRemoveOutline,
  TrashOutline,
} from '@/src/shared/assets/componentsIcons'
import { Dropdown } from '@/src/shared/ui/dropdown/dropdown'
import { DropdownItem } from '@/src/shared/ui/dropdown/dropdownItem/dropdownItem'

type Item = {
  icon: React.ComponentType
  id: number
  onClick: () => void
  title: string
}

type Props = {
  className?: string
  isFollowedBy: boolean
  isOurPost: boolean
  onEdit?: () => void
}

export const DropdownPost = ({ className, isFollowedBy, isOurPost, onEdit = () => {} }: Props) => {
  const renderMenuItem = (item: Item) => (
    <DropdownItem Icon={item.icon} key={item.id} onClick={item.onClick} title={item.title} />
  )

  const ourPostActions: Item[] = [
    {
      icon: Edit2Outline,
      id: 1,
      onClick: onEdit,
      title: 'Edit Post',
    },
    {
      icon: TrashOutline,
      id: 2,
      onClick: () => {
        console.log('delete post')
      },
      title: 'Delete Post',
    },
  ]
  const ourFolloweeActions: Item[] = [
    {
      icon: PersonRemoveOutline,
      id: 1,
      onClick: () => {
        console.log('unfollow user')
      },
      title: 'Unfollow',
    },
    {
      icon: CopyOutline,
      id: 2,
      onClick: () => {
        console.log('Copy link')
      },
      title: 'Copy Link',
    },
  ] //пользователь, которого мы фолловим
  const nonFolloweeActions: Item[] = [
    {
      icon: PersonAddOutline,
      id: 1,
      onClick: () => {
        console.log('follow user')
      },
      title: 'Follow',
    },
    {
      icon: CopyOutline,
      id: 2,
      onClick: () => {
        console.log('Copy link')
      },
      title: 'Copy Link',
    },
  ] // пользователь, которого НЕ фолловим

  // eslint-disable-next-line no-nested-ternary
  const menuItems: Item[] = isOurPost
    ? ourPostActions
    : isFollowedBy
      ? ourFolloweeActions
      : nonFolloweeActions

  return (
    <div className={className}>
      <Dropdown
        list={menuItems}
        renderItem={renderMenuItem}
        trigger={
          <button type={'button'}>
            <MoreHorizontalOutline height={24} viewBox={`1 3 20 20`} />
          </button>
        }
      />
    </div>
  )
}

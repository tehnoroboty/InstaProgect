import React, { ReactNode, useState } from 'react'

import * as Popover from '@radix-ui/react-popover'

import s from '@/src/features/croppingPhoto/croppingPhoto.module.scss'

type Props = {
  align?: 'center' | 'end' | 'start'
  children: ReactNode
  icon: ReactNode
  iconActive: ReactNode
}

export const PopoverComponent = ({ align, children, icon, iconActive }: Props) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Popover.Root onOpenChange={open => setOpen(open)} open={isOpen}>
      <Popover.Trigger asChild>
        <button className={s.btn} type={'button'}>
          {isOpen ? iconActive : icon}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align={align} className={s.content} side={'top'} sideOffset={5}>
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

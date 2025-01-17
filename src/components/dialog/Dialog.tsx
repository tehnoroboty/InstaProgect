import React, { ComponentPropsWithoutRef } from 'react'

import CloseOutline from '@/src/assets/componentsIcons/CloseOutline'
import { Typography } from '@/src/components/typography/Typography'
import { Close, Content, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './dialog.module.scss'

type DialogSize = 'lg' | 'md' | 'sm'

export type DialogProps = {
  modalTitle: string
  onClose: () => void
  open: boolean
  size?: DialogSize
} & ComponentPropsWithoutRef<'div'>

export const Dialog = ({
  children,
  className,
  modalTitle,
  onClose,
  open,
  size = 'md',
  ...rest
}: DialogProps) => {
  return (
    <Root onOpenChange={onClose} open={open} {...rest}>
      <div className={s.Test}></div>
      <Portal>
        <Overlay className={s.overlay} />
        <Content className={clsx(s.content, s[size], className)}>
          <Title asChild className={s.title}>
            <Typography as={'h1'} option={'h1'}>
              {modalTitle}
            </Typography>
          </Title>
          <hr className={s.lineHr} />
          {children}
          <Close asChild>
            <button aria-label={'Close'} className={s.IconButton}>
              <CloseOutline className={clsx(s.icon)} />
            </button>
          </Close>
        </Content>
      </Portal>
    </Root>
  )
}

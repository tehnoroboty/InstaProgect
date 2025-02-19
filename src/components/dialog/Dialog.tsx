import React, { ComponentPropsWithoutRef, ReactNode } from 'react'

import CloseOutline from '@/src/assets/componentsIcons/CloseOutline'
import { Typography } from '@/src/components/typography/Typography'
import { Close, Content, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './dialog.module.scss'

export type DialogProps = {
  extraHeaderContent?: ReactNode
  isSimple?: boolean
  modalTitle?: string
  onClose: () => void
  open: boolean
} & ComponentPropsWithoutRef<'div'>

export const Dialog = ({
  children,
  className,
  extraHeaderContent,
  isSimple = false,
  modalTitle,
  onClose,
  open,
  ...rest
}: DialogProps) => {
  return (
    <Root onOpenChange={onClose} open={open} {...rest}>
      <Portal>
        <Overlay className={s.overlay} />
        <Content className={clsx(s.content, className)}>
          {isSimple ? (
            <div>{children}</div>
          ) : (
            <div>
              {modalTitle && (
                <Title asChild className={s.title}>
                  <Typography as={'h1'} option={'h1'}>
                    {modalTitle}
                  </Typography>
                </Title>
              )}
              {extraHeaderContent}
              <Close asChild>
                <button
                  aria-label={'Close'}
                  className={clsx(s.IconButton, modalTitle ? s.IconButtonIn : s.IconButtonOut)}
                  type={'button'}
                >
                  <CloseOutline className={s.icon} />
                </button>
              </Close>
              {children}
            </div>
          )}
        </Content>
      </Portal>
    </Root>
  )
}

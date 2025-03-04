import React, { ComponentPropsWithoutRef, ReactNode } from 'react'

import CloseOutline from '@/src/shared/assets/componentsIcons/CloseOutline'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Close, Content, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './dialog.module.scss'

export type DialogProps = {
  closeClassName?: string
  extraHeaderContent?: ReactNode
  isSimple?: boolean
  modalTitle?: string
  onClose: () => void
  open: boolean
} & ComponentPropsWithoutRef<'div'>

export const Dialog = ({
  children,
  className,
  closeClassName,
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
              <Close
                className={clsx(
                  s.IconButton,
                  modalTitle ? s.IconButtonIn : s.IconButtonOut,
                  closeClassName
                )}
              >
                <CloseOutline className={s.icon} />
              </Close>
              {modalTitle && <hr className={s.lineHr} />}
              {children}
            </div>
          )}
        </Content>
      </Portal>
    </Root>
  )
}

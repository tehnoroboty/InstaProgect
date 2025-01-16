/*
'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef, HTMLAttributes } from 'react'
import { Content, Description, Overlay, Portal, Root, Title, Trigger } from '@radix-ui/react-dialog'
import Close from '@/src/assets/componentsIcons/CloseOutline'
import clsx from 'clsx'
import s from './dialog.module.scss'

const Dialog = Root

const DialogTrigger = Trigger

const DialogPortal = Portal

const DialogClose = Close

const DialogOverlay = forwardRef<
  ElementRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay ref={ref} className={clsx(s.overlay, className)} {...props} />
))
DialogOverlay.displayName = Overlay.displayName

const DialogContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <Content ref={ref} className={clsx(s.content, className)} {...props}>
      {children}
      <Close className={clsx(s.closeButton, className)}>
        <Close className={clsx(s.icon)} />
      </Close>
    </Content>
  </DialogPortal>
))
DialogContent.displayName = Content.displayName

const DialogTitle = forwardRef<ElementRef<typeof Title>, ComponentPropsWithoutRef<typeof Title>>(
  ({ className, ...props }, ref) => (
    <Title ref={ref} className={clsx(s.title, className)} {...props} />
  )
)
DialogTitle.displayName = Title.displayName

const DialogDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description ref={ref} className={clsx(s.description, className)} {...props} />
))
DialogDescription.displayName = Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
}
*/
import React, { ComponentPropsWithoutRef } from 'react'
import { Content, Overlay, Portal, Root, Title, Close } from '@radix-ui/react-dialog'
import s from './dialog.module.scss'
import CloseOutline from '@/src/assets/componentsIcons/CloseOutline'

import clsx from 'clsx'
import { Typography } from '@/src/components/typography/Typography'

type DialogSize = 'lg' | 'md' | 'sm'

export type DialogProps = {
  open: boolean
  onClose: () => void
  modalTitle: string
  size?: DialogSize
} & ComponentPropsWithoutRef<'div'>

export const Dialog = ({
  modalTitle,
  onClose,
  className,
  open,
  size = 'md',
  children,
  ...rest
}: DialogProps) => {
  return (
    <Root open={open} onOpenChange={onClose} {...rest}>
      <div className={s.Test}></div>
      <Portal>
        <Overlay className={s.overlay} />
        <Content className={clsx(s.content, s[size], className)}>
          <Title asChild>
            <Typography as={'h1'} option={'h1'}>
              {modalTitle}
            </Typography>
          </Title>
          <hr className={s.lineHr} />
          {children}
          <Close asChild>
            <button className={s.IconButton} aria-label="Close">
              <CloseOutline className={clsx(s.icon)} />
            </button>
          </Close>
        </Content>
      </Portal>
    </Root>
  )
}

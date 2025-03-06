'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import {
  Corner,
  Root,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  Viewport,
} from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

import s from './scrollbar.module.scss'

const ScrollArea = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ children, className, ...rest }, ref) => (
    <Root className={clsx(s.scrollArea, className)} ref={ref} {...rest}>
      <Viewport className={s.viewport}>{children}</Viewport>
      <ScrollBar />
      <Corner />
    </Root>
  )
)

ScrollArea.displayName = Root.displayName

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...rest }, ref) => (
  <ScrollAreaScrollbar
    className={clsx(s.scrollBar, orientation === 'vertical' ? s.vertical : s.horizontal, className)}
    orientation={orientation}
    ref={ref}
    {...rest}
  >
    <ScrollAreaThumb
      className={clsx(s.thumb, {
        [s.flex1]: orientation === 'vertical',
      })}
    />
  </ScrollAreaScrollbar>
))

ScrollBar.displayName = ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
